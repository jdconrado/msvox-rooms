import { RoomParticipantStatusCd } from '@domain/enums';

export interface IRoomParticipant {
  id: string;
  userId: string;
  displayName?: string;
  status: RoomParticipantStatusCd;
  createdAt: Date;
}
