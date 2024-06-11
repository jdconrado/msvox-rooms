import {
  Mapper,
  MappingProfile,
  createMap,
  forMember,
  mapFrom,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import {
  RoomSessionEvent,
  RoomSessionEventParameters,
} from '@domain/models/events';
import { Injectable } from '@nestjs/common';
import {
  RoomSessionEventDto,
  RoomSessionEventParametersDto,
} from '@api/rtc/dtos';

@Injectable()
export class RoomSessionProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
  get profile(): MappingProfile {
    return (mapper: Mapper) => {
      this.modelToDto(mapper);
    };
  }

  modelToDto(mapper: Mapper) {
    createMap(
      mapper,
      RoomSessionEventParameters,
      RoomSessionEventParametersDto,
    );
    createMap(
      mapper,
      RoomSessionEvent,
      RoomSessionEventDto,
      forMember(
        (d) => d.body,
        mapFrom((s) => s.body),
      ),
    );
  }
}
