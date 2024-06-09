import {
  MSRouterAppData,
  MSRouterRole,
  MSTransportAppData,
  MSTransportType,
  MSProducerAppData,
  TransportOptions,
} from '@infra/mediasoup/primitives';

import { RtpCapabilities, RtpParameters } from 'mediasoup/node/lib/types';
import { ConsumerResponseDto } from '@api/rtc/dtos/responses';
import { RoomSessionConsumerProducerActionsCd } from '@domain/enums';

export interface IRTCService {
  createRouter(type: MSRouterRole): Promise<MSRouterAppData>;
  createTransport(
    routerId: string,
    type: MSTransportType,
    onRouterClosed?: (transportId: string) => void,
  ): Promise<[MSTransportAppData, TransportOptions]>;
  createProducer(
    transportId: string,
    kind: 'audio' | 'video',
    rtpParameters: RtpParameters,
    onTransportClose?: (producerId: string) => void,
  ): Promise<MSProducerAppData>;
  createConsumer(
    transportId: string,
    producerId: string,
    rtpCapabilities: RtpCapabilities,
    onProducerAction?: (
      consumerId: string,
      action: RoomSessionConsumerProducerActionsCd,
    ) => void,
  ): Promise<ConsumerResponseDto>;
  closeRouter(routerId: string): Promise<void>;
}
