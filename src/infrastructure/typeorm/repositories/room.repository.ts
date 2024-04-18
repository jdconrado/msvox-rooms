import { RoomEntity } from '../entities/room.entity';
import { IRoomRepository } from '../primitives/repositories/room.repository.port';
import { BaseRepository } from './base.repository';
import { Room } from '../../../domain/models/room.model';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { IRoomFilter } from '../../../domain/primitives/filters';
import { FilterOperators } from 'typeorm/driver/mongodb/typings';

export class RoomRepository
  extends BaseRepository<RoomEntity, Room>
  implements IRoomRepository
{
  constructor(
    @InjectRepository(RoomEntity) repository: MongoRepository<RoomEntity>,
    @InjectMapper() mapper: Mapper,
  ) {
    super(repository, RoomEntity, Room, mapper);
  }

  override filterToQueryObject(
    filter: IRoomFilter,
  ): Partial<RoomEntity> | FilterOperators<RoomEntity> {
    const queryObject: Partial<RoomEntity> | FilterOperators<RoomEntity> = {};

    if (filter.name) {
      queryObject.name = {
        $regex: new RegExp(filter.name, 'i'),
      };
    }
    if (filter.userId) {
      queryObject['participants.userId'] = filter.userId;
    }

    return queryObject;
  }
}
