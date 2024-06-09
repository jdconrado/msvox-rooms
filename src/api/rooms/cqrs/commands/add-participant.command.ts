import { RoomParticipant } from '@domain/models';

export class AddRoomParticipantCommand {
  constructor(
    public readonly roomId: string,
    public readonly participant: RoomParticipant,
  ) {}
}
