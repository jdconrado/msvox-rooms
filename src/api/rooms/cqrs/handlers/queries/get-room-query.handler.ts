import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetRoomQuery } from '@api/rooms/cqrs/queries';
import { RoomService } from '@services/room.service';
import { Logger, NotFoundException } from '@nestjs/common';

@QueryHandler(GetRoomQuery)
export class GetRoomQueryHandler implements IQueryHandler<GetRoomQuery> {
  private readonly logger = new Logger(GetRoomQueryHandler.name);
  constructor(private readonly roomService: RoomService) {}

  async execute(query: GetRoomQuery) {
    this.logger.debug('execute query');
    const result = await this.roomService.getById(query.id);
    if (!result) {
      throw new NotFoundException(`Room with id ${query.id} not found`);
    }
    return result;
  }
}
