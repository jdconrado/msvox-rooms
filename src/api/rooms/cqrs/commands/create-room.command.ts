import { Room } from '@domain/models';

export class CreateRoomCommand {
  constructor(public room: Room) {}
}
