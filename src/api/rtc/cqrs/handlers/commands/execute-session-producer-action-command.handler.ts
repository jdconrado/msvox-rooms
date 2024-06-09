import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ExecuteSessionProducerActionCommand } from '@api/rtc/cqrs/commands';
import { Logger, NotFoundException } from '@nestjs/common';
import { RTCService } from '@services/rtc.service';
import { RoomSessionService } from '@services/room-session.service';

@CommandHandler(ExecuteSessionProducerActionCommand)
export class ExecuteSessionProducerActionCommandHandler
  implements ICommandHandler<ExecuteSessionProducerActionCommand>
{
  private readonly logger = new Logger(
    ExecuteSessionProducerActionCommandHandler.name,
  );
  constructor(
    private readonly rtcService: RTCService,
    private readonly roomSessionService: RoomSessionService,
  ) {}
  async execute(command: ExecuteSessionProducerActionCommand): Promise<void> {
    this.logger.debug('execute command: {command}', { command });
    const session = this.roomSessionService.getById(command.sessionId);
    if (!session) {
      throw new NotFoundException(`session ${command.sessionId} not found`);
    }
    if (!session.producerIds.includes(command.producerId)) {
      throw new NotFoundException(
        `producer ${command.producerId} not found in session ${command.sessionId}`,
      );
    }
    await this.rtcService.executeProducerAction(
      command.producerId,
      command.action,
    );
  }
}
