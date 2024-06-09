import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateSessionConsumerCommand } from '@api/rtc/cqrs/commands';
import {
  Logger,
  NotFoundException,
  PreconditionFailedException,
} from '@nestjs/common';
import { RTCService } from '@services/rtc.service';
import { RoomSessionService } from '@services/room-session.service';
import { ConsumerResponseDto } from '@api/rtc/dtos/responses';
import { RoomSessionEventsService } from '@services/room-session-events.service';

@CommandHandler(CreateSessionConsumerCommand)
export class CreateSessionConsumerCommandHandler
  implements ICommandHandler<CreateSessionConsumerCommand>
{
  private readonly logger = new Logger(
    CreateSessionConsumerCommandHandler.name,
  );
  constructor(
    private readonly rtcService: RTCService,
    private readonly roomSessionService: RoomSessionService,
    private readonly roomSessionEventsService: RoomSessionEventsService,
  ) {}
  async execute(
    command: CreateSessionConsumerCommand,
  ): Promise<ConsumerResponseDto> {
    //TODO: Review the return type
    this.logger.debug('execute command');

    const session = this.roomSessionService.getById(command.sessionId);
    if (!session) {
      throw new NotFoundException(`session ${command.sessionId} not found`);
    }

    if (!session.consumerTransportId) {
      throw new PreconditionFailedException(
        `session ${command.sessionId} does not have a consumer transport`,
      );
    }

    // find the target session
    const targetSession = this.roomSessionService.getSession(
      session.roomId,
      command.participantId,
    );

    if (!targetSession) {
      throw new NotFoundException(
        `session not found for participant ${command.participantId}`,
      );
    }
    const producerId = targetSession.producerIds[0];
    if (!producerId) {
      throw new NotFoundException(
        `producer not found for participant ${command.participantId}`,
      );
    }

    const result = await this.rtcService.createConsumer(
      session.consumerTransportId,
      producerId,
      command.rtpCapabilities,
      (consumerId, action) =>
        this.roomSessionEventsService.handleConsumerAction(
          session.id,
          consumerId,
          action,
        ),
    );

    await this.roomSessionService.addConsumer(command.sessionId, result.id);

    this.logger.debug(
      `consumer ${result.id} created for session ${command.sessionId}`,
    );

    return result;
  }
}
