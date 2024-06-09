import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ServiceModule } from '@services/service.module';
import { RoomSessionController } from '@api/rtc/room-session.controller';
import { Handlers } from '@api/rtc/cqrs/handlers';
import { RoomSessionProfile } from '@api/rtc/profiles/room-session.profile';
import { RoomSessionGateway } from './ws-gateways';

@Module({
  imports: [CqrsModule, ServiceModule],
  controllers: [RoomSessionController],
  providers: [RoomSessionGateway, RoomSessionProfile, ...Handlers],
})
export class RoomSessionModule {}
