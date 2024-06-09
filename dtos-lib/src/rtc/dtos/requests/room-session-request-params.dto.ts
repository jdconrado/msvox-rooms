import { IsNotEmpty, IsString } from 'class-validator';
import { RoomRequestParamsDto } from './room-request-params.dto';
import { AutoMap } from '@automapper/classes';

export class RoomSessionRequestParamsDto extends RoomRequestParamsDto {
  @AutoMap()
  @IsNotEmpty()
  @IsString()
  sessionId: string;
}
