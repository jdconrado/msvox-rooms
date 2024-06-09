import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ExecuteSessionTransportActionCommand } from '@api/rtc/cqrs/commands';
import { BadRequestException, Logger, NotFoundException } from '@nestjs/common';
import { RTCService } from '@services/rtc.service';
import { RoomSessionService } from '@services/room-session.service';
import { CreateSessionConsumerCommandHandler } from '@api/rtc/cqrs/handlers/commands/create-session-consumer-command.handler';
import { RoomSession } from '@domain/models/room-session.model';
import { RoomSessionTransportDirectionCd } from '@domain/enums';

@CommandHandler(ExecuteSessionTransportActionCommand)
export class ExecuteSessionTransportActionCommandHandler
  implements ICommandHandler<ExecuteSessionTransportActionCommand>
{
  private readonly logger = new Logger(
    CreateSessionConsumerCommandHandler.name,
  );
  constructor(
    private readonly rtcService: RTCService,
    private readonly roomSessionService: RoomSessionService,
  ) {}
  async execute(command: ExecuteSessionTransportActionCommand): Promise<void> {
    this.logger.debug('execute command');
    const session = this.roomSessionService.getById(command.sessionId);
    if (!session) {
      throw new NotFoundException(`session ${command.sessionId} not found`);
    }
    const transportId = this.getTransportId(
      session,
      command.transportDirection,
    );
    await this.rtcService.executeTransportAction(transportId, command.action);
  }

  private getTransportId(
    session: RoomSession,
    transportDirection: RoomSessionTransportDirectionCd,
  ): string {
    const transportId =
      transportDirection === RoomSessionTransportDirectionCd.SEND
        ? session.producerTransportId
        : session.consumerTransportId;
    if (!transportId) {
      throw new BadRequestException(
        `session ${session.id} does not have a ${
          transportDirection === RoomSessionTransportDirectionCd.SEND
            ? 'producer'
            : 'consumer'
        } transport`,
      );
    }
    return transportId;
  }
}
