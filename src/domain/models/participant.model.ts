import { AutoMap } from '@automapper/classes';
import { RoomParticipantStatusCd } from '@domain/enums';
import { IRoomParticipant } from '@domain/primitives';

export class RoomParticipant implements IRoomParticipant {
  @AutoMap()
  id: string;
  @AutoMap()
  userId: string;
  @AutoMap()
  displayName?: string;
  @AutoMap()
  status: RoomParticipantStatusCd;
  @AutoMap()
  createdAt: Date;

  // constructor(partial: Required<RoomParticipant>) {
  //   const value = RoomParticipantSchema.parse(partial);
  //   Object.assign(this, value);
  // }
}
