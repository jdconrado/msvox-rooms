import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import {
  createMap,
  forMember,
  mapFrom,
  Mapper,
  MappingProfile,
} from '@automapper/core';
import {
  Room,
  RoomParticipant,
  BaseModel,
  RoomFilter,
  OffsetPagination,
} from '@domain/models';
import {
  RoomDto,
  RoomParticipantDto,
  CreateRoomDto,
  CreateRoomParticipantDto,
  EntityDto,
  SearchRoomRequestDto,
} from '@api/rooms/dtos';

import { v4 as uuidv4 } from 'uuid';

import { mapDateToISOString, mapISOStringToDate } from '@api/commons/utils';
import { OffsetPaginationDto } from '@api/commons/dtos';

@Injectable()
export class RoomProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
  get profile(): MappingProfile {
    return (mapper: Mapper) => {
      this.dtoToModel(mapper);
      this.modelToDto(mapper);
    };
  }

  dtoToModel(mapper: Mapper) {
    createMap(
      mapper,
      EntityDto,
      BaseModel,
      mapISOStringToDate('createdAt'),
      mapISOStringToDate('updatedAt'),
    );
    createMap(mapper, OffsetPaginationDto, OffsetPagination);
    createMap(mapper, RoomParticipantDto, RoomParticipant);
    createMap(
      mapper,
      CreateRoomParticipantDto,
      RoomParticipant,
      forMember(
        (d) => d.id,
        mapFrom(() => {
          return uuidv4();
        }),
      ),
      forMember(
        (d) => d.createdAt,
        mapFrom(() => {
          return new Date();
        }),
      ),
    );
    createMap(mapper, RoomDto, Room);
    createMap(mapper, CreateRoomDto, Room);
    createMap(mapper, SearchRoomRequestDto, RoomFilter);
  }

  modelToDto(mapper: Mapper) {
    createMap(
      mapper,
      BaseModel,
      EntityDto,
      mapDateToISOString('createdAt'),
      mapISOStringToDate('updatedAt'),
    );
    createMap(
      mapper,
      RoomParticipant,
      RoomParticipantDto,
      mapDateToISOString('createdAt'),
    );
    createMap(mapper, Room, RoomDto);
    createMap(mapper, RoomFilter, SearchRoomRequestDto);
  }
}
