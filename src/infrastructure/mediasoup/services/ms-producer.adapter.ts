import { Producer } from 'mediasoup/node/lib/Producer';
import { AppData, RtpParameters } from 'mediasoup/node/lib/types';
import {
  IMSProducerAdapter,
  MSProducerAppData,
  MSTransportAppData,
} from '@infra/mediasoup/primitives';
import { MSTransportAdapter } from './ms-transport.adapter';
import { Logger, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

export class MSProducerAdapter implements IMSProducerAdapter {
  private readonly logger = new Logger(MSProducerAdapter.name);
  private readonly producers: Map<string, Producer> = new Map();

  constructor(private readonly msTransportAdapter: MSTransportAdapter) {}
  getProducersData(): MSProducerAppData[] {
    return Array.from(this.producers.values()).map(
      (producer) => producer.appData as MSProducerAppData,
    );
  }
  getProducerData(producerId: string): MSProducerAppData {
    const producer = this.producers.get(producerId);
    if (!producer) {
      throw new NotFoundException(`producer ${producerId} not found`);
    }
    return producer.appData as MSProducerAppData;
  }
  async createProducer(input: {
    transportId: string;
    kind: 'audio' | 'video';
    rtpParameters: RtpParameters;
    options?: { clientAppData?: object };
  }): Promise<MSProducerAppData> {
    const transport = this.msTransportAdapter.getTransport(input.transportId);
    const transportData = transport.appData as MSTransportAppData;
    const producerAppData = new MSProducerAppData({
      id: uuidv4(),
      routerId: transportData.routerId,
      transportId: transportData.id,
      kind: input.kind,
      rtpParameters: input.rtpParameters,
      paused: false,
    });
    const producer = await transport.produce({
      id: producerAppData.id,
      kind: input.kind,
      rtpParameters: input.rtpParameters,
      paused: false,
      appData: producerAppData,
    });
    this.logger.log(`producer ${producerAppData.id} created`);
    this.producers.set(producerAppData.id, producer);
    return producerAppData;
  }
  getProducer(producerId: string): Producer<AppData> {
    const producer = this.producers.get(producerId);
    if (!producer) {
      throw new NotFoundException(`producer ${producerId} not found`);
    }
    return producer;
  }
}
