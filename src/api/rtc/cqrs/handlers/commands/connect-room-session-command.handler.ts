import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ConnectRoomSessionCommand } from '@api/rtc/cqrs/commands';
import {
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { RoomService } from '@services/room.service';
import { RoomSessionService } from '@services/room-session.service';
import { RoomSessionEventsService } from '@services/room-session-events.service';
import { RoomParticipantStatusCd } from '@domain/enums';

@CommandHandler(ConnectRoomSessionCommand)
export class ConnectRoomSessionCommandHandler
  implements ICommandHandler<ConnectRoomSessionCommand>
{
  private readonly logger = new Logger(ConnectRoomSessionCommandHandler.name);
  constructor(
    private readonly roomSessionService: RoomSessionService,
    private readonly roomService: RoomService,
    private readonly roomSessionEventsService: RoomSessionEventsService,
  ) {}

  async execute(command: ConnectRoomSessionCommand): Promise<string> {
    this.logger.debug('execute command');
    const session = this.roomSessionService.getById(command.sessionId);
    if (!session) {
      throw new NotFoundException(`session ${command.sessionId} not found`);
    }
    const participant = await this.roomService.getParticipantByUserId(
      session.roomId,
      command.userId,
    );

    if (!participant) {
      throw new UnauthorizedException(
        `participant belonging to user ${command.userId} not found on room ${session.roomId}`,
      );
    }

    if (participant.id !== session.participantId) {
      throw new UnauthorizedException(
        `participant belonging to user ${command.userId} is not the owner of session ${command.sessionId}`,
      );
    }

    if (participant.status !== RoomParticipantStatusCd.JOINING) {
      throw new UnauthorizedException(
        `participant belonging to user ${command.userId} is not in the joining status on session ${command.sessionId}`,
      );
    }

    participant.status = RoomParticipantStatusCd.JOINED;
    await this.roomService.patchParticipant(
      session.roomId,
      session.participantId,
      participant,
    );
    this.roomSessionEventsService.handleParticipantStatusChange(
      session.id,
      participant.id,
      participant.status,
    );
    this.roomSessionService.setConnectionId(session.id, command.connectionId);

    return session.roomId; // return room id
  }
}
