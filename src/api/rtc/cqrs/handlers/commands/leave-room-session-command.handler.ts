import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LeaveRoomSessionCommand } from '../../commands';
import { Logger, NotFoundException } from '@nestjs/common';
import { RoomSessionEventsService } from '@services/room-session-events.service';
import { RoomSessionService } from '@services/room-session.service';
import { RoomService } from '@services/room.service';
import { RTCService } from '@services/rtc.service';
import { RoomParticipantStatusCd, RoomStatusCd } from '@domain/enums';

@CommandHandler(LeaveRoomSessionCommand)
export class LeaveRoomSessionCommandHandler
  implements ICommandHandler<LeaveRoomSessionCommand>
{
  private readonly logger = new Logger(LeaveRoomSessionCommandHandler.name);
  constructor(
    private readonly roomSessionService: RoomSessionService,
    private readonly roomService: RoomService,
    private readonly roomSessionEventsService: RoomSessionEventsService,
    private readonly rtcService: RTCService,
  ) {}

  async execute(command: LeaveRoomSessionCommand): Promise<void> {
    this.logger.debug('execute command');
    let sessions = this.roomSessionService.getByUserId(command.userId);
    if (command.sessionId) {
      sessions = sessions.filter((s) => s.id === command.sessionId);
    }
    if (sessions.length === 0) {
      throw new NotFoundException(
        `session not found for userId ${command.userId}`,
      );
    }

    for (const session of sessions) {
      const room = await this.roomService.getById(session.roomId);
      if (!room) {
        throw new NotFoundException(`room ${session.roomId} not found`);
      }

      const participant = room.participants.find(
        (p) => p.id === session.participantId,
      );

      // Close all consumers
      for (const consumerId of session.consumerIds) {
        await this.rtcService.closeConsumer(consumerId);
      }

      // Close all producers
      for (const producerId of session.producerIds) {
        await this.rtcService.closeProducer(producerId);
      }

      // Close all transports
      for (const transportId of [
        session.producerTransportId,
        session.consumerTransportId,
      ]) {
        if (!transportId) continue;
        await this.rtcService.closeTransport(transportId);
      }

      // Update participant and room status
      participant.status = RoomParticipantStatusCd.INACTIVE;
      if (
        room.participants.every(
          (p) => p.status === RoomParticipantStatusCd.INACTIVE,
        )
      ) {
        room.status = RoomStatusCd.ENDED;
        if (room.routerId) {
          await this.rtcService.closeRouter(room.routerId);
        }
        room.routerId = null;
      }

      await this.roomService.replace(room.id, room);

      // Emit event

      await this.roomSessionEventsService.handleParticipantStatusChange(
        session.id,
        participant.id,
        participant.status,
      );

      if (room.status === RoomStatusCd.ENDED) {
        await this.roomSessionEventsService.handleRoomClosed(session.roomId);
      }
      // Remove session
      this.roomSessionService.removeSession(session.id);
    }
  }
}
