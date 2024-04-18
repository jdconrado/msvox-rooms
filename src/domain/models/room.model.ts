import { AutoMap } from '@automapper/classes';
import { RoomParticipant } from './participant.model';
import { IRoom } from '../primitives/room.interface';
import { BaseModel } from './base.model';

export class Room extends BaseModel implements IRoom {
  @AutoMap()
  name: string;
  @AutoMap(() => [RoomParticipant])
  participants: RoomParticipant[];
  // public constructor(partial: Required<Room>) {
  //   super();
  //   const value = RoomSchema.parse(partial);
  //   Object.assign(this, value);
  //   this.participants = [];
  //   value.participants?.forEach((participant) => {
  //     this.participants.push(new RoomParticipant(participant));
  //   });
  // }
}
