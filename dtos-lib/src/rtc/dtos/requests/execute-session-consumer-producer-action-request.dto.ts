import { AutoMap } from '@automapper/classes';
import { IsDefined, IsEnum } from 'class-validator';

import { RoomSessionConsumerProducerActionsCd } from '../../../enums';

export class ExecuteSessionConsumerProducerActionRequestDto {
  @AutoMap()
  @IsDefined()
  @IsEnum(RoomSessionConsumerProducerActionsCd)
  action: RoomSessionConsumerProducerActionsCd;
}
