import { AutoMap } from '@automapper/classes';
import {
  RoomSessionEventsCd,
  RoomSessionParticipantEventsCd,
} from '../../enums';

import { RoomSessionEventParametersDto } from './room-session-event-parameters.dto';

export class RoomSessionEventDto<T = any> {
  @AutoMap(() => RoomSessionEventParametersDto)
  params: RoomSessionEventParametersDto;

  @AutoMap()
  type: RoomSessionEventsCd | RoomSessionParticipantEventsCd;

  @AutoMap()
  timestamp: number;

  @AutoMap()
  body?: T;
}
