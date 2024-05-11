import { AutoMap } from '@automapper/classes';
import { Type } from 'class-transformer';
import { RoomDto } from '../../../rooms/dtos';

export class CreateRoomResponseDto {
  @AutoMap(() => RoomDto)
  @Type(() => RoomDto)
  room: RoomDto;
}
