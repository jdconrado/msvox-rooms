import { ConflictException, Logger, NotFoundException } from '@nestjs/common';
import { Consumer } from 'mediasoup/node/lib/Consumer';
import { AppData, RtpCapabilities } from 'mediasoup/node/lib/types';
import {
  IMSConsumerAdapter,
  MSConsumerAppData,
} from 'src/infrastructure/mediasoup/primitives/ms-consumer.adapter.interface';
import { MSTransportAdapterService } from './ms-transport.adapter';
import { MSTransportAppData } from 'src/infrastructure/mediasoup/primitives/ms-transport.adapter.interface';
import { v4 as uuidv4 } from 'uuid';
import { MSRouterAdapterService } from './ms-router.adapter';

export class MSConsumerAdapterService implements IMSConsumerAdapter {
  private readonly logger = new Logger(MSConsumerAdapterService.name);
  private readonly consumers: Map<string, Consumer> = new Map();

  constructor(
    private readonly msTransportAdapter: MSTransportAdapterService,
    private readonly msRouterAdapter: MSRouterAdapterService,
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
      kind: transportData.type,
      rtpParameters: input.rtpCapabilities,
      paused: true,
    });
    const consumer = await transport.consume({
      producerId: input.producerId,
      rtpCapabilities: input.rtpCapabilities,
      paused: true,
      appData: consumerAppData,
    });
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
