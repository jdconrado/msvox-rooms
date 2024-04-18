import { Producer } from 'mediasoup/node/lib/Producer';
import { AppData, MediaKind, RtpParameters } from 'mediasoup/node/lib/types';
import {
  IMSProducerAdapter,
  MSProducerAppData,
} from 'src/infrastructure/mediasoup/primitives/ms-producer.adapter.interface';
import { MSTransportAdapterService } from './ms-transport.adapter';
import { Logger, NotFoundException } from '@nestjs/common';
import { MSTransportAppData } from 'src/infrastructure/mediasoup/primitives/ms-transport.adapter.interface';
import { v4 as uuidv4 } from 'uuid';

export class MsProducerAdapterService implements IMSProducerAdapter {
  private readonly logger = new Logger(MsProducerAdapterService.name);
  private readonly producers: Map<string, Producer> = new Map();

  constructor(private readonly msTransportAdapter: MSTransportAdapterService) {}
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
    kind: string;
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
      kind: input.kind as MediaKind,
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
