import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_VARIABLES } from '@config/app-variables.config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: APP_VARIABLES.MONGODB_URI,
      entities: [__dirname + '/orm/entities/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  providers: [],
  exports: [],
})
export class InfrastructureModule {}
