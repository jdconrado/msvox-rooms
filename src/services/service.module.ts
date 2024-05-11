import { Module } from '@nestjs/common';
import { RepositoryModule } from '@infra/orm/repository.module';
import { RoomService } from './room.service';
import { MediaSoupModule } from '@infra/mediasoup/mediasoup.module';
import { RTCService } from './rtc.service';

@Module({
  imports: [RepositoryModule, MediaSoupModule],
  providers: [RoomService, RTCService],
  exports: [RoomService, RTCService],
})
export class ServiceModule {}
