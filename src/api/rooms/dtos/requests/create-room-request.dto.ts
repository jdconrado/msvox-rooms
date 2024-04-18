import { AutoMap } from '@automapper/classes';
import { CreateRoomDto } from './create-room.dto';
import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRoomRequestDto {
  @AutoMap(() => CreateRoomDto)
  @Type(() => CreateRoomDto)
  @IsNotEmpty()
  room: CreateRoomDto;
}
