import { Module } from '@nestjs/common';
import { RepositoryModule } from '../infrastructure/typeorm/repository.module';
import { RoomService } from './room.service';

@Module({
  imports: [RepositoryModule],
  providers: [RoomService],
  exports: [RoomService],
})
export class ServiceModule {}
