import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import {
  createMap,
  forMember,
  mapFrom,
  Mapper,
  MappingProfile,
} from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { RoomParticipantEntity } from '../entities/participant.entity';
import { RoomParticipant } from '../../../domain/models/participant.model';
import { RoomEntity } from '../entities/room.entity';
import { Room } from '../../../domain/models/room.model';
import { BaseEntity } from '../entities/base.entity';
import { BaseModel } from '../../../domain/models/base.model';
import { ObjectId } from 'mongodb';
import { extendEntityToModel, extendModelToEntity } from './commons/base-entity-profile-mapper.halper';

@Injectable()
export class RoomEntityProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
  get profile(): MappingProfile {
    return (mapper: Mapper) => {
      this.entityToModel(mapper);
      this.modelToEntity(mapper);
    };
  }

  entityToModel(mapper: Mapper) {
    createMap(mapper, RoomParticipantEntity, RoomParticipant);
    createMap(mapper, RoomEntity, Room, extendEntityToModel(mapper));
  }

  modelToEntity(mapper: Mapper) {
    createMap(mapper, RoomParticipant, RoomParticipantEntity);
    createMap(mapper, Room, RoomEntity, extendModelToEntity(mapper));
  }
}
