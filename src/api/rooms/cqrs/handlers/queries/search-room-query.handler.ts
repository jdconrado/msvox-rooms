import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SearchRoomQuery } from '../../queries';
import { ISearchMetadata } from '@domain/primitives';
import { Room } from '@domain/models';
import { Logger } from '@nestjs/common';
import { RoomService } from '@services/room.service';

@QueryHandler(SearchRoomQuery)
export class SearchRoomQueryHandler implements IQueryHandler<SearchRoomQuery> {
  private readonly logger = new Logger(SearchRoomQueryHandler.name);
  constructor(private readonly roomService: RoomService) {}
  execute(query: SearchRoomQuery): Promise<[Room[], ISearchMetadata]> {
    this.logger.debug('execute query');
    return this.roomService.search(query.filter, {
      pagination: query.pagination,
    });
  }
}
