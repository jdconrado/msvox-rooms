import { IsNotEmpty, IsString } from 'class-validator';
import { AutoMap } from '@automapper/classes';

export class RoomRequestParamsDto {
  @AutoMap()
  @IsNotEmpty()
  @IsString()
  roomId: string;
}
