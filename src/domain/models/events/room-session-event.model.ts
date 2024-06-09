import { AutoMap } from '@automapper/classes';
import { RoomSessionEventsCd } from '@domain/enums';
import { IRoomSessionEvent } from '@domain/primitives';
import { RoomSessionEventParameters } from './room-session-event-parameters.model';

export class RoomSessionEvent<T = undefined> implements IRoomSessionEvent<T> {
  @AutoMap(() => RoomSessionEventParameters)
  params: RoomSessionEventParameters;

  @AutoMap()
  type: RoomSessionEventsCd;

  @AutoMap()
  timestamp: number;

  @AutoMap()
  body?: T;

  constructor(input?: IRoomSessionEvent<T>) {
    Object.assign(this, input);
  }
}
