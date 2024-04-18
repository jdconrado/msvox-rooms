import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateRoomCommand } from '../../commands';
import { Room } from '../../../../../domain/models/room.model';
import { RoomService } from '../../../../../services/room.service';
import { InternalServerErrorException, Logger } from '@nestjs/common';

@CommandHandler(CreateRoomCommand)
export class CreateRoomCommandHandler
  implements ICommandHandler<CreateRoomCommand>
{
  private readonly logger = new Logger(CreateRoomCommandHandler.name);
  constructor(private readonly roomService: RoomService) {}
  async execute(command: CreateRoomCommand): Promise<Room> {
    this.logger.debug('execute command');
    try {
      return await this.roomService.create(command.room);
    } catch (e) {
      this.logger.error('error on create room', e);
      throw new InternalServerErrorException('Room could not be created');
    }
  }
}
