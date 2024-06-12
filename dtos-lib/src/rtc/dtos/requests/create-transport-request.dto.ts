import { AutoMap } from '@automapper/classes';

import { RoomSessionTransportDirectionCd } from '../../../enums';
import { IsDefined, IsEnum } from 'class-validator';

export class CreateTransportRequestDto {
  @AutoMap()
  @IsEnum(RoomSessionTransportDirectionCd)
  @IsDefined()
  direction: RoomSessionTransportDirectionCd;
}
