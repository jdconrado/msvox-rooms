import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import {
  createMap,
  forMember,
  mapFrom,
  Mapper,
  MappingProfile,
} from '@automapper/core';
import { Room } from '../../../domain/models/room.model';
import { RoomDto } from '../dtos/room.dto';
import { RoomParticipantDto } from '../dtos/roomParticipantDto';
import { RoomParticipant } from '../../../domain/models/participant.model';
import { CreateRoomDto } from '../dtos/requests';
import { CreateRoomParticipantDto } from '../dtos/requests';
import { v4 as uuidv4 } from 'uuid';
import { EntityDto } from '../dtos/entity.dto';
import { BaseModel } from '../../../domain/models/base.model';
import {
  mapDateToISOString,
  mapISOStringToDate,
} from '../../commons/utils/mapper.helpers';
import { SearchRoomRequestDto } from '../dtos/requests';
import { RoomFilter } from '../../../domain/models/filters/room-filter.model';

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
