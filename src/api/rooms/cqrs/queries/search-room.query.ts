import { RoomFilter } from '../../../../domain/models/filters/room-filter.model';

export class SearchRoomQuery {
  constructor(public filter: RoomFilter) {}
}
