import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateWebTransportCommand } from '@api/rtc/cqrs/commands';
import { WebTransportOptionsDto } from '@api/rtc/dtos/transport-options';
import { BadRequestException, Logger, NotFoundException } from '@nestjs/common';
import { RTCService } from '@services/rtc.service';
import {
  RoomParticipantStatusCd,
  RoomSessionTransportActionsCd,
  RoomSessionTransportDirectionCd,
} from '@domain/enums';
import { MSTransportType } from '@infra/mediasoup/primitives';
import { RoomSessionService } from '@services/room-session.service';
import { RoomService } from '@services/room.service';
import { RoomSessionEventsService } from '@services/room-session-events.service';

@CommandHandler(CreateWebTransportCommand)
export class CreateWebTransportCommandHandler
  implements ICommandHandler<CreateWebTransportCommand>
{
  private readonly logger = new Logger(CreateWebTransportCommandHandler.name);
  constructor(
    private readonly rtcService: RTCService,
    private readonly roomSessionService: RoomSessionService,
    private readonly roomService: RoomService,
    private readonly roomSessionEventsService: RoomSessionEventsService,
  ) {}
  async execute(
    command: CreateWebTransportCommand,
  ): Promise<WebTransportOptionsDto> {
    this.logger.debug('execute command');

    const session = this.roomSessionService.getById(command.sessionId);
    if (!session) {
      throw new NotFoundException(`session ${command.sessionId} not found`);
    }

    const participant = await this.roomService.getParticipantById(
      session.roomId,
      session.participantId,
    );

    const notAllowedStatuses = [
      RoomParticipantStatusCd.JOINING,
      RoomParticipantStatusCd.INACTIVE,
    ];
    if (notAllowedStatuses.includes(participant.status)) {
      throw new BadRequestException(
        `participant ${participant.id} status is invalid for creating a transport`,
      );
    }

    if (
      command.direction === RoomSessionTransportDirectionCd.SEND &&
      session.producerTransportId
    ) {
      throw new BadRequestException(
        `session ${command.sessionId} already has a producer transport`,
      );
    }

    if (
      command.direction === RoomSessionTransportDirectionCd.RECV &&
      session.consumerTransportId
    ) {
      throw new BadRequestException(
        `session ${command.sessionId} already has a consumer transport`,
      );
    }

    const result = await this.rtcService.createTransport(
      session.routerId,
      MSTransportType.WEB_RTC,
      () =>
        this.roomSessionEventsService.handleTransportAction(
          session.id,
          command.direction,
          RoomSessionTransportActionsCd.CLOSE,
        ),
    );

    if (command.direction === RoomSessionTransportDirectionCd.SEND) {
      this.roomSessionService.setProducerTransportId(session.id, result[0].id);
    } else {
      this.roomSessionService.setConsumerTransportId(session.id, result[0].id);
    }

    this.logger.debug('transport created', { result });

    return result[1];
  }
}
