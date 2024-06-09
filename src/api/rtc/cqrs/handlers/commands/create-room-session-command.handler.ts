import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateRoomSessionCommand } from '@api/rtc/cqrs/commands';
import {
  BadRequestException,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  PreconditionFailedException,
} from '@nestjs/common';
import { RoomService } from '@services/room.service';
import { RTCService } from '@services/rtc.service';
import { RoomSessionService } from '@services/room-session.service';
import { RoomParticipantStatusCd, RoomStatusCd } from '@domain/enums';
import { MSRouterRole } from '@infra/mediasoup/primitives';
import { RoomSessionEventsService } from '@services/room-session-events.service';

@CommandHandler(CreateRoomSessionCommand)
export class CreateRoomSessionCommandHandler
  implements ICommandHandler<CreateRoomSessionCommand>
{
  private readonly logger = new Logger(CreateRoomSessionCommandHandler.name);
  constructor(
    private readonly roomService: RoomService,
    private readonly rtcService: RTCService,
    private readonly roomSessionService: RoomSessionService,
    private readonly roomSessionEventsService: RoomSessionEventsService,
  ) {}
  async execute(command: CreateRoomSessionCommand): Promise<string> {
    this.logger.debug('execute command');
    const room = await this.roomService.getById(command.roomId);
    if (!room) {
      throw new NotFoundException(`room ${command.roomId} not found`);
    }

    const notAllowedStatuses = [RoomStatusCd.ENDED, RoomStatusCd.SCHEDULED];
    if (notAllowedStatuses.includes(room.status)) {
      throw new PreconditionFailedException(
        `room ${command.roomId} is in status ${room.status}, thus, cannot get rtp capabilities`,
      );
    }

    const participant = room.participants.find(
      (p) => p.id === command.participantId,
    );

    if (!participant) {
      throw new BadRequestException(
        `participant ${command.participantId} not found on room ${room.id}`,
      );
    }

    const isValidRouter = !!this.rtcService.getRouterData(room.routerId);
    if (!room.routerId || !isValidRouter) {
      if (!command.allowRouterCreation) {
        throw new InternalServerErrorException(
          `room ${command.roomId} does not have a router`,
        );
      } else {
        if (room.participants.length > 0) {
          //TODO: Review validation
          this.logger.debug('creating router for room');
          const router = await this.rtcService.createRouter(MSRouterRole.AUDIO);
          this.logger.debug('router created', { router });
          room.routerId = router.id;
          await this.roomService.replace(room.id, room);
        }
      }
    }

    const result = this.roomSessionService.createSession(
      command.roomId,
      command.participantId,
      room.routerId,
    );

    // update participant status
    participant.status = RoomParticipantStatusCd.JOINING;
    await this.roomService.replace(room.id, room);

    // emit event
    this.roomSessionEventsService.handleParticipantStatusChange(
      result,
      participant.id,
      participant.status,
    );

    this.logger.debug('room session created', { result });

    return result;
  }
}
