import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ServiceModule } from '@services/service.module';
import { RoomController } from './room.controller';
import { RoomProfile } from '@api/rooms/profiles/room.profile';
import { Handlers } from '@api/rooms/cqrs/handlers';

@Module({
  imports: [CqrsModule, ServiceModule],
  controllers: [RoomController],
  providers: [RoomProfile, ...Handlers],
})
export class RoomModule {}
