import { Module } from '@nestjs/common';
import { HealthCheckController } from '@api/health-check/health-check.controller';

@Module({
  controllers: [HealthCheckController],
})
export class HealthCheckModule {}
