import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { routePaths } from '../commons/route-paths';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import {
  CreateRoomDto,
  CreateRoomRequestDto,
  SearchRoomRequestDto,
} from './dtos/requests';
import { CreateRoomResponseDto } from './dtos/responses/create-room-response.dto';
import { Room } from '../../domain/models/room.model';
import { CreateRoomCommand } from './cqrs/commands';
import { RoomDto } from './dtos/room.dto';
import { GetRoomQuery } from './cqrs/queries/get-room.query';
import {
  DataMetadataResponseDto,
  MetadataResponseDto,
} from '../commons/dtos/responses';
import { RoomFilter } from '../../domain/models/filters/room-filter.model';
import { SearchRoomQuery } from './cqrs/queries';
import { ISearchMetadata } from '../../domain/primitives/common/search-metadata.interface';

@Controller({ path: routePaths.rooms.system })
export class RoomController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createRoom(
    @Body() body: CreateRoomRequestDto,
  ): Promise<CreateRoomResponseDto> {
    const room = this.mapper.map(body.room, CreateRoomDto, Room);
    const command = new CreateRoomCommand(room);

    const result = await this.commandBus.execute<CreateRoomCommand, Room>(
      command,
    );

    const response = new CreateRoomResponseDto();
    response.room = this.mapper.map(result, Room, RoomDto);

    return response;
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async searchRooms(
    @Query() filter: SearchRoomRequestDto,
  ): Promise<DataMetadataResponseDto<Room[], SearchRoomRequestDto>> {
    const roomFilter = this.mapper.map(
      filter,
      SearchRoomRequestDto,
      RoomFilter,
    );
    const query = new SearchRoomQuery(roomFilter);

    const result = await this.queryBus.execute<
      SearchRoomQuery,
      [Room[], ISearchMetadata]
    >(query);

    const metadata = new MetadataResponseDto(
      result[1].pagination,
      result[1].sorting,
      filter,
    );

    return new DataMetadataResponseDto<Room[], SearchRoomRequestDto>(
      result[0],
      metadata,
    );
  }

  @Get('/:roomId')
  @HttpCode(HttpStatus.OK)
  async getRoom(@Param('roomId') id: string): Promise<RoomDto> {
    if (!id) {
      throw new BadRequestException('Id is required');
    }
    const query = new GetRoomQuery(id);

    const result = await this.queryBus.execute(query);

    return this.mapper.map(result, Room, RoomDto);
  }
}
