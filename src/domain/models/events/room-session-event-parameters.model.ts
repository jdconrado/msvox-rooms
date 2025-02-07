import { AutoMap } from '@automapper/classes';
import { IRoomSessionEventParameters } from '@domain/primitives';

export class RoomSessionEventParameters implements IRoomSessionEventParameters {
  @AutoMap()
  roomId: string;

  @AutoMap()
  sessionId: string;

  @AutoMap()
  from?: boolean;

  @AutoMap()
  toSessionId?: string;

  @AutoMap()
  participantId?: string;

  @AutoMap()
  producerId?: string;

  @AutoMap()
  consumerId?: string;

  constructor(input?: IRoomSessionEventParameters) {
    Object.assign(this, input);
  }
}
