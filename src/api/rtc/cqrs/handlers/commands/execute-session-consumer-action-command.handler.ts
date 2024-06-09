import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ExecuteSessionConsumerActionCommand } from '@api/rtc/cqrs/commands';
import { Logger, NotFoundException } from '@nestjs/common';
import { RTCService } from '@services/rtc.service';
import { RoomSessionService } from '@services/room-session.service';

@CommandHandler(ExecuteSessionConsumerActionCommand)
export class ExecuteSessionConsumerActionCommandHandler
  implements ICommandHandler<ExecuteSessionConsumerActionCommand>
{
  private readonly logger = new Logger(
    ExecuteSessionConsumerActionCommandHandler.name,
  );
  constructor(
    private readonly rtcService: RTCService,
    private readonly roomSessionService: RoomSessionService,
  ) {}
  async execute(command: ExecuteSessionConsumerActionCommand): Promise<void> {
    this.logger.debug('execute command: {command}', { command });
    const session = this.roomSessionService.getById(command.sessionId);
    if (!session) {
      throw new NotFoundException(`session ${command.sessionId} not found`);
    }
    if (!session.consumerIds.includes(command.consumerId)) {
      throw new NotFoundException(
        `consumer ${command.consumerId} not found in session ${command.sessionId}`,
      );
    }
    await this.rtcService.executeConsumerAction(
      command.consumerId,
      command.action,
    );
  }
}
