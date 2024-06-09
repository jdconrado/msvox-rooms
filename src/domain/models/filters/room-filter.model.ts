import { IRoomFilter } from '@domain/primitives';
import { AutoMap } from '@automapper/classes';
import { RoomStatusCd } from '@domain/enums';

export class RoomFilter implements IRoomFilter {
  @AutoMap()
  name?: string;
  @AutoMap()
  userId?: string;
  @AutoMap()
  status?: RoomStatusCd[];
}
