import { SearchRoomQueryHandler } from './search-room-query.handler';
import { GetRoomQueryHandler } from './get-room-query.handler';

export * from './get-room-query.handler';
export * from './search-room-query.handler';

export const QueryHandlers = [GetRoomQueryHandler, SearchRoomQueryHandler];
