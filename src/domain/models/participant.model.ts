import { AutoMap } from '@automapper/classes';
import { IRoomParticipant } from '../primitives/participant.interface';

export class RoomParticipant implements IRoomParticipant {
  @AutoMap()
  id: string;
  @AutoMap()
  userId: string;
  @AutoMap()
  createdAt: Date;

  // constructor(partial: Required<RoomParticipant>) {
  //   const value = RoomParticipantSchema.parse(partial);
  //   Object.assign(this, value);
  // }
}
