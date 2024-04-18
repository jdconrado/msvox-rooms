import { AutoMap } from '@automapper/classes';
import { Type } from 'class-transformer';
import { RoomDto } from '../room.dto';

export class CreateRoomResponseDto {
  @AutoMap(() => RoomDto)
  @Type(() => RoomDto)
  room: RoomDto;
}
