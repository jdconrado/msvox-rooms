import {
  MSRouterAppData,
  MSRouterRole,
  MSTransportAppData,
  MSTransportType,
  MSProducerAppData,
  MSConsumerAppData,
} from '@infra/mediasoup/primitives';

import { RtpCapabilities, RtpParameters } from 'mediasoup/node/lib/types';

export interface IRTCService {
  createRouter(type: MSRouterRole): Promise<MSRouterAppData>;
  createTransport(
    routerId: string,
    type: MSTransportType,
  ): Promise<MSTransportAppData>;
  createProducer(
    transportId: string,
    kind: 'audio' | 'video',
    rtpParameters: RtpParameters,
  ): Promise<MSProducerAppData>;
  createConsumer(
    transportId: string,
    producerId: string,
    rtpCapabilities: RtpCapabilities,
  ): Promise<MSConsumerAppData>;
}
