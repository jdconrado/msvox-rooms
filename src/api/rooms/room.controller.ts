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
import { routePaths } from '@api/commons/route-paths';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import {
  CreateRoomDto,
  CreateRoomRequestDto,
  SearchRoomRequestDto,
  CreateRoomResponseDto,
  RoomParticipantDto,
  CreateRoomParticipantDto,
} from '@api/rooms/dtos';

import {
  OffsetPagination,
  Room,
  RoomFilter,
  RoomParticipant,
} from '@domain/models';
import {
  AddRoomParticipantCommand,
  CreateRoomCommand,
} from '@api/rooms/cqrs/commands';
import { RoomDto } from '@api/rooms/dtos/room.dto';
import { GetRoomQuery, SearchRoomQuery } from '@api/rooms/cqrs/queries';
import {
  DataMetadataResponseDto,
  DataResponse,
  MetadataResponseDto,
  OffsetPaginationDto,
} from '@api/commons/dtos';

import { ISearchMetadata } from '@domain/primitives';

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
  ): Promise<DataResponse<CreateRoomResponseDto>> {
    const room = this.mapper.map(body.room, CreateRoomDto, Room);
    const command = new CreateRoomCommand(room);

    const result = await this.commandBus.execute<CreateRoomCommand, Room>(
      command,
    );

    const response = new CreateRoomResponseDto();
    response.room = this.mapper.map(result, Room, RoomDto);

    return new DataResponse(response);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async searchRooms(
    @Query() filter: SearchRoomRequestDto,
  ): Promise<DataMetadataResponseDto<RoomDto[], SearchRoomRequestDto>> {
    const roomFilter = this.mapper.map(
      filter,
      SearchRoomRequestDto,
      RoomFilter,
    );
    const pagination = this.mapper.map(
      filter,
      OffsetPaginationDto,
      OffsetPagination,
    );
    const query = new SearchRoomQuery(roomFilter, pagination);

    const result = await this.queryBus.execute<
      SearchRoomQuery,
      [Room[], ISearchMetadata]
    >(query);

    const metadata = new MetadataResponseDto(
      result[1].pagination,
      result[1].sorting,
      filter,
    );

    const rooms = this.mapper.mapArray(result[0], Room, RoomDto);

    return new DataMetadataResponseDto<RoomDto[], SearchRoomRequestDto>(
      rooms,
      metadata,
    );
  }

  @Get('/:roomId')
  @HttpCode(HttpStatus.OK)
  async getRoom(@Param('roomId') id: string): Promise<DataResponse<RoomDto>> {
    if (!id) {
      throw new BadRequestException('Id is required');
    }
    const query = new GetRoomQuery(id);

    const result = await this.queryBus.execute(query);

    const response = this.mapper.map(result, Room, RoomDto);

    return new DataResponse(response);
  }

  @Post('/:roomId/participants')
  @HttpCode(HttpStatus.CREATED)
  async addParticipant(
    @Param('roomId') id: string,
    @Body() body: CreateRoomParticipantDto,
  ): Promise<DataResponse<RoomParticipantDto>> {
    if (!id) {
      throw new BadRequestException('Id is required');
    }
    const command = new AddRoomParticipantCommand(
      id,
      this.mapper.map(body, CreateRoomParticipantDto, RoomParticipant),
    );

    const result = await this.commandBus.execute<
      AddRoomParticipantCommand,
      RoomParticipant
    >(command);

    const response = this.mapper.map(
      result,
      RoomParticipant,
      RoomParticipantDto,
    );

    return new DataResponse(response);
  }
}
