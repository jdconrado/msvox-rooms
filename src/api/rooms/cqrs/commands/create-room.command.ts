import { Room } from '../../../../domain/models/room.model';

export class CreateRoomCommand {
  constructor(public room: Room) {}
}
