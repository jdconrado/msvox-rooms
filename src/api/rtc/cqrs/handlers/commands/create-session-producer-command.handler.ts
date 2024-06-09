import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateSessionProducerCommand } from '@api/rtc/cqrs/commands';
import {
  Logger,
  NotFoundException,
  PreconditionFailedException,
} from '@nestjs/common';
import { RTCService } from '@services/rtc.service';
import { RoomSessionService } from '@services/room-session.service';
import { RoomService } from '@services/room.service';
import {
  RoomParticipantStatusCd,
  RoomSessionConsumerProducerActionsCd,
} from '@domain/enums';
import { RoomSessionEventsService } from '@services/room-session-events.service';

@CommandHandler(CreateSessionProducerCommand)
export class CreateSessionProducerCommandHandler
  implements ICommandHandler<CreateSessionProducerCommand>
{
  private readonly logger = new Logger(
    CreateSessionProducerCommandHandler.name,
  );
  constructor(
    private readonly rtcService: RTCService,
    private readonly roomSessionService: RoomSessionService,
    private readonly roomService: RoomService,
    private readonly roomSessionEventsService: RoomSessionEventsService,
  ) {}
  async execute(command: CreateSessionProducerCommand): Promise<string> {
    this.logger.debug('execute command');

    const session = this.roomSessionService.getById(command.sessionId);
    if (!session) {
      throw new NotFoundException(`session ${command.sessionId} not found`);
    }

    if (!session.producerTransportId) {
      throw new PreconditionFailedException(
        `session ${command.sessionId} does not have a producer transport`,
      );
    }

    const result = await this.rtcService.createProducer(
      session.producerTransportId,
      command.kind,
      command.rtpParameters,
      (producerId) =>
        this.roomSessionEventsService.handleProducerAction(
          session.id,
          producerId,
          RoomSessionConsumerProducerActionsCd.CLOSE,
        ),
    );

    await this.roomSessionService.addProducer(command.sessionId, result.id);
    await this.roomService.patchParticipant(
      session.roomId,
      session.participantId,
      { status: RoomParticipantStatusCd.ACTIVE },
    );
    await this.roomSessionEventsService.handleParticipantStatusChange(
      session.id,
      session.participantId,
      RoomParticipantStatusCd.ACTIVE,
    );

    this.logger.debug(
      `producer ${result.id} created for session ${command.sessionId}`,
    );

    return result.id;
  }
}
