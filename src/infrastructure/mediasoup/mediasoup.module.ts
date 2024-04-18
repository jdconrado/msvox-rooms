import { Module } from '@nestjs/common';
import { MSWorkerAdapterService } from './services/ms-worker.adapter';
import { MSRouterAdapterService } from './services/ms-router.adapter';
import { MSTransportAdapterService } from './services/ms-transport.adapter';
import { MSConsumerAdapterService } from './services/ms-consumer.adapter';
import { MsProducerAdapterService } from './services/ms-producer.adapter';

@Module({
  imports: [],
  controllers: [],
  providers: [
    MSWorkerAdapterService,
    MSRouterAdapterService,
    MSTransportAdapterService,
    MSConsumerAdapterService,
    MsProducerAdapterService,
  ],
  exports: [
    MSWorkerAdapterService,
    MSRouterAdapterService,
    MSTransportAdapterService,
    MSConsumerAdapterService,
    MsProducerAdapterService,
  ],
})
export class MediaSoupModule {}
