import { Module } from '@nestjs/common';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { RoomModule } from '@api/rooms/room.module';
import { ConfigModule } from '@nestjs/config';
import { InfrastructureModule } from '@infra/infastructure.module';
import { RoomSessionModule } from '@api/rtc/room-session.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      cache: true,
    }),
    EventEmitterModule.forRoot(),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    InfrastructureModule,
    RoomModule,
    RoomSessionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
