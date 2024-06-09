import { IsNotEmpty, IsString } from 'class-validator';
import { RoomRequestParamsDto } from './room-request-params.dto';
import { AutoMap } from '@automapper/classes';

export class RoomSessionProducerRequestParamsDto extends RoomRequestParamsDto {
  @AutoMap()
  @IsNotEmpty()
  @IsString()
  sessionId: string;

  @AutoMap()
  @IsNotEmpty()
  @IsString()
  producerId: string;
}
