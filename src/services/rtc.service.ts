import { IRTCService } from './primitives';
import {
  RtpCapabilities,
  RtpParameters,
} from 'mediasoup/node/lib/RtpParameters';

import { MSProducerAppData } from '@infra/mediasoup/primitives/ms-producer.adapter.interface';
import {
  MSRouterAppData,
  MSRouterRole,
} from '@infra/mediasoup/primitives/ms-router.adapter.interface';
import {
  MSTransportAppData,
  MSTransportType,
} from '@infra/mediasoup/primitives/ms-transport.adapter.interface';
import { MSRouterAdapter } from '@infra/mediasoup/services/ms-router.adapter';
import { MSTransportAdapter } from '@infra/mediasoup/services/ms-transport.adapter';
import { MSProducerAdapter } from '@infra/mediasoup/services/ms-producer.adapter';
import { MSConsumerAdapter } from '@infra/mediasoup/services/ms-consumer.adapter';
import { MSConsumerAppData } from '@infra/mediasoup/primitives/ms-consumer.adapter.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RTCService implements IRTCService {
  constructor(
    private readonly msRouterAdapter: MSRouterAdapter,
    private readonly msTransportAdapter: MSTransportAdapter,
    private readonly msProducerAdapter: MSProducerAdapter,
    private readonly msConsumerAdapter: MSConsumerAdapter,
  ) {}
  createConsumer(
    transportId: string,
    producerId: string,
    rtpCapabilities: RtpCapabilities,
  ): Promise<MSConsumerAppData> {
    return this.msConsumerAdapter.createConsumer({
      transportId,
      producerId,
      rtpCapabilities,
    });
  }

  createProducer(
    transportId: string,
    kind: 'audio' | 'video',
    rtpParameters: RtpParameters,
  ): Promise<MSProducerAppData> {
    return this.msProducerAdapter.createProducer({
      transportId,
      kind,
      rtpParameters,
    });
  }

  createRouter(type: MSRouterRole): Promise<MSRouterAppData> {
    return this.msRouterAdapter.createRouter({ role: type });
  }

  createTransport(
    routerId: string,
    type: MSTransportType,
  ): Promise<MSTransportAppData> {
    return this.msTransportAdapter.createTransport({ routerId, type });
  }
}
