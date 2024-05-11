import {
  createMap,
  forMember,
  mapFrom,
  Mapper,
  extend,
} from '@automapper/core';
import { BaseEntity } from '@infra/orm/entities';
import { BaseModel } from '@domain/models';
import { ObjectId } from 'mongodb';

export const extendEntityToModel = (mapper: Mapper) => {
  const baseMapping = createMap(
    mapper,
    BaseEntity,
    BaseModel,
    forMember(
      (d) => d.id,
      mapFrom((s) => s._id.toString()),
    ),
  );

  return extend(baseMapping);
};

export const extendModelToEntity = (mapper: Mapper) => {
  const baseMapping = createMap(
    mapper,
    BaseModel,
    BaseEntity,
    forMember(
      (d) => d._id,
      mapFrom((s) => (s.id ? new ObjectId(s.id) : undefined)),
    ),
  );

  return extend(baseMapping);
};
