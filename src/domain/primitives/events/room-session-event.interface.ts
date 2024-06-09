import { RoomSessionEventsCd } from '@domain/enums';
import { IRoomSessionEventParameters } from './room-session-event-parameters.interface';

export interface IRoomSessionEvent<T> {
  params: IRoomSessionEventParameters;
  type: RoomSessionEventsCd;
  timestamp: number;
  body?: T;
}
