import { AutoMap } from '@automapper/classes';
import { IRoomParticipant } from '@domain/primitives';

export class RoomParticipant implements IRoomParticipant {
  @AutoMap()
  id: string;
  @AutoMap()
  userId: string;
  @AutoMap()
  sendTransportId?: string;
  @AutoMap()
  recvTransportId?: string;
  @AutoMap()
  createdAt: Date;

  // constructor(partial: Required<RoomParticipant>) {
  //   const value = RoomParticipantSchema.parse(partial);
  //   Object.assign(this, value);
  // }
}
