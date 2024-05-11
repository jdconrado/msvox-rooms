import { Module } from '@nestjs/common';
import { RoomRepository } from './repositories';
import { RoomEntityProfile } from '@infra/orm/profiles/room-entity.profile';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomEntity } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([RoomEntity])],
  providers: [RoomEntityProfile, RoomRepository],
  exports: [RoomRepository],
})
export class RepositoryModule {}
