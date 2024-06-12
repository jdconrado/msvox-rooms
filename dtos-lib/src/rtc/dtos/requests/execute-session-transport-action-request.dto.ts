import { AutoMap } from '@automapper/classes';
import { IsDefined, IsEnum } from 'class-validator';

import {
  RoomSessionTransportActionsCd,
  RoomSessionTransportDirectionCd,
} from '../../../enums';

export class ExecuteSessionTransportActionRequestDto {
  @AutoMap()
  @IsDefined()
  @IsEnum(RoomSessionTransportDirectionCd)
  direction: RoomSessionTransportDirectionCd;

  @AutoMap()
  @IsDefined()
  @IsEnum(RoomSessionTransportActionsCd)
  action: RoomSessionTransportActionsCd;
}
