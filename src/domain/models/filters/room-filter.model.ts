import { IRoomFilter } from '../../primitives/filters';
import { AutoMap } from '@automapper/classes';

export class RoomFilter implements IRoomFilter {
  @AutoMap()
  name?: string;
  @AutoMap()
  userId?: string;
}
