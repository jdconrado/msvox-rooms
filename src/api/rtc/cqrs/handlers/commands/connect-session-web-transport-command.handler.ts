import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ConnectSessionWebTransportCommand } from '@api/rtc/cqrs/commands';
import { BadRequestException, Logger, NotFoundException } from '@nestjs/common';
import { RTCService } from '@services/rtc.service';
import { RoomSessionService } from '@services/room-session.service';
import { RoomSessionTransportDirectionCd } from '@domain/enums';
import { RoomSession } from '@domain/models/room-session.model';

@CommandHandler(ConnectSessionWebTransportCommand)
export class ConnectSessionWebTransportCommandHandler
  implements ICommandHandler<ConnectSessionWebTransportCommand>
{
  private readonly logger = new Logger(
    ConnectSessionWebTransportCommandHandler.name,
  );
  constructor(
    private readonly rtcService: RTCService,
    private readonly roomSessionService: RoomSessionService,
  ) {}
  async execute(command: ConnectSessionWebTransportCommand): Promise<any> {
    this.logger.debug('execute command');
    const session = this.roomSessionService.getById(command.sessionId);
    if (!session) {
      throw new NotFoundException(`session ${command.sessionId} not found`);
    }
    const transportId = this.getTransportId(
      session,
      command.transportDirection,
    );
    await this.rtcService.connectTransport(transportId, command.dtlsParameters);
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
