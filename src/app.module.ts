import { Module } from '@nestjs/common';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { RoomModule } from '@api/rooms/room.module';
import { ConfigModule } from '@nestjs/config';
import { InfrastructureModule } from '@infra/infastructure.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      cache: true,
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    InfrastructureModule,
    RoomModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
