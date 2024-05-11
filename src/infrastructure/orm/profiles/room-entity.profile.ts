import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper, MappingProfile } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { RoomEntity, RoomParticipantEntity } from '@infra/orm/entities';
import { Room, RoomParticipant } from '@domain/models';
import { extendEntityToModel, extendModelToEntity } from './commons';

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
