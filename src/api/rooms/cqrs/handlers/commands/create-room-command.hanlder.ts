import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateRoomCommand } from '../../commands';
import { Room } from '@domain/models';
import { RoomService } from '@services/room.service';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { RTCService } from '@services/rtc.service';
import { MSRouterRole } from '@infra/mediasoup/primitives';

@CommandHandler(CreateRoomCommand)
export class CreateRoomCommandHandler
  implements ICommandHandler<CreateRoomCommand>
{
  private readonly logger = new Logger(CreateRoomCommandHandler.name);
  constructor(
    private readonly roomService: RoomService,
    private readonly rtcService: RTCService,
  ) {}
  async execute(command: CreateRoomCommand): Promise<Room> {
    this.logger.debug('execute command');
    try {
      let room = await this.roomService.create(command.room);
      if (room.participants.length > 0) {
        this.logger.debug('creating router for room');
        const router = await this.rtcService.createRouter(MSRouterRole.AUDIO);
        this.logger.debug('router created', { router });
        room.routerId = router.id;
        room = await this.roomService.replace(room.id, room);
      }
      return room;
    } catch (e) {
      this.logger.error('error on create room', e);
      throw new InternalServerErrorException('Room could not be created');
    }
  }
}
