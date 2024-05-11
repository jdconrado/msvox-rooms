import { Module } from '@nestjs/common';
import {
  MSWorkerAdapter,
  MSRouterAdapter,
  MSTransportAdapter,
  MSConsumerAdapter,
  MSProducerAdapter,
} from './services';

@Module({
  imports: [],
  controllers: [],
  providers: [
    MSWorkerAdapter,
    MSRouterAdapter,
    MSTransportAdapter,
    MSConsumerAdapter,
    MSProducerAdapter,
  ],
  exports: [
    MSWorkerAdapter,
    MSRouterAdapter,
    MSTransportAdapter,
    MSConsumerAdapter,
    MSProducerAdapter,
  ],
})
export class MediaSoupModule {}
