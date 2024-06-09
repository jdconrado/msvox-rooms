import { RoomStatusCd } from '@domain/enums';

export interface IRoomFilter {
  name?: string;
  userId?: string;
  status?: RoomStatusCd[];
}
