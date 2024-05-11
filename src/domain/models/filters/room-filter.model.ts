import { IRoomFilter } from '@domain/primitives';
import { AutoMap } from '@automapper/classes';

export class RoomFilter implements IRoomFilter {
  @AutoMap()
  name?: string;
  @AutoMap()
  userId?: string;
}
