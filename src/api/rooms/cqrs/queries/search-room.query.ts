import { OffsetPagination, RoomFilter } from '@domain/models';

export class SearchRoomQuery {
  constructor(
    public filter: RoomFilter,
    public pagination?: OffsetPagination,
  ) {}
}
