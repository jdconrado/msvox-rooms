import { Module } from '@nestjs/common';
import { RepositoryModule } from '@infra/orm/repository.module';
import { RoomService } from './room.service';
import { MediaSoupModule } from '@infra/mediasoup/mediasoup.module';
import { RTCService } from './rtc.service';
import { RoomSessionService } from '@services/room-session.service';
import { RoomSessionEventsService } from './room-session-events.service';

@Module({
  imports: [RepositoryModule, MediaSoupModule],
  providers: [
    RoomService,
    RTCService,
    RoomSessionService,
    RoomSessionEventsService,
  ],
  exports: [
    RoomService,
    RTCService,
    RoomSessionService,
    RoomSessionEventsService,
  ],
})
export class ServiceModule {}
