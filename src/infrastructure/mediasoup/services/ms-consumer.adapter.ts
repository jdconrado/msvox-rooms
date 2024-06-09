import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Consumer } from 'mediasoup/node/lib/Consumer';
import { AppData, RtpCapabilities } from 'mediasoup/node/lib/types';
import {
  IMSConsumerAdapter,
  MSConsumerAppData,
  MSTransportAppData,
} from '@infra/mediasoup/primitives';
import { MSTransportAdapter } from './ms-transport.adapter';
import { v4 as uuidv4 } from 'uuid';
import { MSRouterAdapter } from './ms-router.adapter';

@Injectable()
export class MSConsumerAdapter implements IMSConsumerAdapter {
  private readonly logger = new Logger(MSConsumerAdapter.name);
  private readonly consumers: Map<string, Consumer> = new Map();

  constructor(
    private readonly msTransportAdapter: MSTransportAdapter,
    private readonly msRouterAdapter: MSRouterAdapter,
  ) {}
  getConsumerData(consumerId: string): MSConsumerAppData {
    const consumer = this.consumers.get(consumerId);
    if (!consumer) {
      throw new NotFoundException(`consumer ${consumerId} not found`);
    }
    return consumer.appData as MSConsumerAppData;
  }
  getConsumersData(): MSConsumerAppData[] {
    return Array.from(this.consumers.values()).map(
      (producer) => producer.appData as MSConsumerAppData,
    );
  }

  async createConsumer(input: {
    transportId: string;
    producerId: string;
    rtpCapabilities: RtpCapabilities;
    options?: { clientAppData?: object };
  }): Promise<MSConsumerAppData> {
    const transport = this.msTransportAdapter.getTransport(input.transportId);
    const transportData = transport.appData as MSTransportAppData;
    const router = this.msRouterAdapter.getRouter(transportData.routerId);
    const canConsume = router.canConsume({
      producerId: input.producerId,
      rtpCapabilities: input.rtpCapabilities,
    });
    if (!canConsume) {
      throw new ConflictException(`cannot consume ${input.producerId}`);
    }
    const consumerAppData = new MSConsumerAppData({
      id: uuidv4(),
      routerId: transportData.routerId,
      transportId: transportData.id,
      producerId: input.producerId,
      kind: 'audio',
      rtpParameters: input.rtpCapabilities,
      paused: true,
    });
    const consumer = await transport.consume({
      producerId: input.producerId,
      rtpCapabilities: input.rtpCapabilities,
      paused: true,
      appData: consumerAppData,
    });

    consumerAppData.kind = consumer.kind;
    consumerAppData.id = consumer.id;
    this.logger.log(`consumer ${consumerAppData.id} created`);
    this.consumers.set(consumerAppData.id, consumer);
    return consumerAppData;
  }
  getConsumer(consumerId: string): Consumer<AppData> {
    const consumer = this.consumers.get(consumerId);
    if (!consumer) {
      throw new NotFoundException(`consumer ${consumerId} not found`);
    }
    return consumer;
  }
}
