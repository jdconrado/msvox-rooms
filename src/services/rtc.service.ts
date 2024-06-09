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
  TransportOptions,
} from '@infra/mediasoup/primitives/ms-transport.adapter.interface';
import { MSRouterAdapter } from '@infra/mediasoup/services/ms-router.adapter';
import { MSTransportAdapter } from '@infra/mediasoup/services/ms-transport.adapter';
import { MSProducerAdapter } from '@infra/mediasoup/services/ms-producer.adapter';
import { MSConsumerAdapter } from '@infra/mediasoup/services/ms-consumer.adapter';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { DtlsParametersDto } from '@api/rtc/dtos';
import { ConsumerResponseDto } from '@api/rtc/dtos/responses';
import {
  RoomSessionConsumerProducerActionsCd,
  RoomSessionTransportActionsCd,
} from '@domain/enums';

@Injectable()
export class RTCService implements IRTCService {
  private readonly logger = new Logger(RTCService.name);
  constructor(
    private readonly msRouterAdapter: MSRouterAdapter,
    private readonly msTransportAdapter: MSTransportAdapter,
    private readonly msProducerAdapter: MSProducerAdapter,
    private readonly msConsumerAdapter: MSConsumerAdapter,
  ) {}
  async createConsumer(
    transportId: string,
    producerId: string,
    rtpCapabilities: RtpCapabilities,
    onProducerAction?: (
      consumerId: string,
      action: RoomSessionConsumerProducerActionsCd,
    ) => void,
  ): Promise<ConsumerResponseDto> {
    const consumerData = await this.msConsumerAdapter.createConsumer({
      transportId,
      producerId,
      rtpCapabilities,
    });
    const consumer = this.msConsumerAdapter.getConsumer(consumerData.id);

    if (onProducerAction) {
      consumer.on('producerclose', () =>
        onProducerAction(
          consumerData.id,
          RoomSessionConsumerProducerActionsCd.CLOSE,
        ),
      );
      consumer.on('producerpause', () =>
        onProducerAction(
          consumerData.id,
          RoomSessionConsumerProducerActionsCd.PAUSE,
        ),
      );
      consumer.on('producerresume', () =>
        onProducerAction(
          consumerData.id,
          RoomSessionConsumerProducerActionsCd.RESUME,
        ),
      );
    }

    return {
      id: consumer.id,
      producerId: consumer.producerId,
      kind: consumer.kind,
      rtpParameters: consumer.rtpParameters,
    };
  }

  async executeConsumerAction(
    consumerId: string,
    action: RoomSessionConsumerProducerActionsCd,
  ): Promise<void> {
    this.logger.debug('execute action on consumer: {consumerId, action}', {
      consumerId,
      action,
    });
    const consumer = this.msConsumerAdapter.getConsumer(consumerId);
    if (!consumer) {
      throw new NotFoundException('Consumer not found');
    }
    switch (action) {
      case RoomSessionConsumerProducerActionsCd.PAUSE:
        await consumer.pause();
        break;
      case RoomSessionConsumerProducerActionsCd.RESUME:
        await consumer.resume();
        break;
      case RoomSessionConsumerProducerActionsCd.CLOSE:
        consumer.close();
        break;
      default:
        throw new NotFoundException('Action not found');
    }
  }

  async closeConsumer(consumerId: string): Promise<void> {
    const consumer = this.msConsumerAdapter.getConsumer(consumerId);
    if (!consumer) {
      throw new NotFoundException('Consumer not found');
    }
    consumer.close();
  }

  async createProducer(
    transportId: string,
    kind: 'audio' | 'video',
    rtpParameters: RtpParameters,
    onTransportClosed?: (producerId: string) => void,
  ): Promise<MSProducerAppData> {
    const producerData = await this.msProducerAdapter.createProducer({
      transportId,
      kind,
      rtpParameters,
    });

    const producer = this.msProducerAdapter.getProducer(producerData.id);
    if (onTransportClosed) {
      producer.on('transportclose', () => onTransportClosed(producerData.id));
    }

    return producerData;
  }

  async executeProducerAction(
    producerId: string,
    action: RoomSessionConsumerProducerActionsCd,
  ): Promise<void> {
    this.logger.debug('execute action on producer: {producerId, action}', {
      producerId,
      action,
    });
    const producer = this.msProducerAdapter.getProducer(producerId);
    if (!producer) {
      throw new NotFoundException('Producer not found');
    }
    switch (action) {
      case RoomSessionConsumerProducerActionsCd.PAUSE:
        await producer.pause();
        break;
      case RoomSessionConsumerProducerActionsCd.RESUME:
        await producer.resume();
        break;
      case RoomSessionConsumerProducerActionsCd.CLOSE:
        producer.close();
        break;
      default:
        throw new NotFoundException('Action not found');
    }
  }

  async closeProducer(producerId: string): Promise<void> {
    const producer = this.msProducerAdapter.getProducer(producerId);
    if (!producer) {
      throw new NotFoundException('Producer not found');
    }
    producer.close();
  }

  createRouter(type: MSRouterRole): Promise<MSRouterAppData> {
    return this.msRouterAdapter.createRouter({ role: type });
  }

  getRouterData(routerId: string): MSRouterAppData | null {
    return this.msRouterAdapter.getRouterData(routerId);
  }
  getRouterRtpCapabilities(routerId: string): RtpCapabilities {
    const router = this.msRouterAdapter.getRouter(routerId);
    return router.rtpCapabilities;
  }

  async createTransport(
    routerId: string,
    type: MSTransportType,
    onRouterClosed?: (transportId: string) => void,
  ): Promise<[MSTransportAppData, TransportOptions]> {
    const result = await this.msTransportAdapter.createTransport({
      routerId,
      type,
    });

    const transport = this.msTransportAdapter.getTransport(result[0].id);
    if (onRouterClosed) {
      transport.on('routerclose', () => onRouterClosed(result[0].id));
    }

    return result;
  }

  async closeTransport(transportId: string): Promise<void> {
    this.logger.debug('close transport: {transportId}', { transportId });
    const transport = this.msTransportAdapter.getTransport(transportId);
    if (!transport) {
      throw new NotFoundException('Transport not found');
    }
    transport.close();
  }

  async executeTransportAction(
    transportId: string,
    action: RoomSessionTransportActionsCd,
  ): Promise<void> {
    this.logger.debug('execute action on transport: {transportId, action}', {
      transportId,
      action,
    });
    const transport = this.msTransportAdapter.getTransport(transportId);
    if (!transport) {
      throw new NotFoundException('Transport not found');
    }
    if (action === RoomSessionTransportActionsCd.CLOSE) {
      transport.close();
    }
  }

  async connectTransport(
    transportId: string,
    dtlsParameters: DtlsParametersDto,
  ): Promise<void> {
    this.logger.debug('connect transport: {transportId}', { transportId });
    const transport = this.msTransportAdapter.getTransport(transportId);
    if (!transport) {
      throw new NotFoundException('Transport not found');
    }
    await transport.connect({ dtlsParameters });
  }

  async closeRouter(routerId: string): Promise<void> {
    this.logger.debug('close router: {routerId}', { routerId });
    const router = this.msRouterAdapter.getRouter(routerId);
    if (!router) {
      throw new NotFoundException('Router not found');
    }
    router.close();
  }
}
