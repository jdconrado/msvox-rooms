import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import {
  IMSTransportAdapter,
  MSTransportAppData,
  MSTransportType,
  MSRouterAppData,
  MSWorkerAppData,
} from '@infra/mediasoup/primitives';
import { MSRouterAdapter } from './ms-router.adapter';
import {
  Transport,
  AppData,
  TransportEvents,
  TransportObserverEvents,
} from 'mediasoup/node/lib/types';
import { MSWorkerAdapter } from './ms-worker.adapter';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MSTransportAdapter implements IMSTransportAdapter {
  private readonly logger = new Logger(MSTransportAdapter.name);
  private readonly transports: Map<string, Transport> = new Map();

  constructor(
    private readonly msRouterAdapter: MSRouterAdapter,
    private readonly msWorkerAdapter: MSWorkerAdapter,
  ) {}
  getTransportsData(): MSTransportAppData[] {
    return Array.from(this.transports.values()).map(
      (transport) => transport.appData as MSTransportAppData,
    );
  }
  getTransportData(id: string): MSTransportAppData {
    const transport = this.transports.get(id);
    if (!transport) {
      throw new NotFoundException(`transport ${id} not found`);
    }
    return transport.appData as MSTransportAppData;
  }
  async createTransport(input: {
    routerId: string;
    type: MSTransportType;
    options?: object;
  }): Promise<MSTransportAppData> {
    const router = this.msRouterAdapter.getRouter(input.routerId);
    const worker = this.msWorkerAdapter.getWorker(
      (<MSRouterAppData>router.appData).workerId,
    );
    const workerData = worker.appData as MSWorkerAppData;

    const transportAppData = new MSTransportAppData({
      consumersCount: 0,
      dataConsumersCount: 0,
      producersCount: 0,
      dataProducersCount: 0,
      maxConsumers: Infinity,
      maxProducers: Infinity,
      maxDataConsumers: Infinity,
      maxDataProducers: Infinity,
      routerId: (<MSRouterAppData>router.appData).id,
      id: uuidv4(),
      type: input.type,
    });
    let transport: Transport;
    switch (input.type) {
      case MSTransportType.WEB_RTC:
        if (workerData.webRTCServer) {
          transport = await router.createWebRtcTransport({
            webRtcServer: workerData.webRTCServer,
            enableUdp: true,
            enableTcp: false,
            appData: transportAppData,
          });
        } else {
          throw new ConflictException('no webRTC server available');
        }
        break;
      default:
        throw new BadRequestException('transport type not supported');
    }
    transport.observer.on('newproducer', (producer) => {
      transportAppData.producersCount++;
      producer.observer.on('close', () => {
        transportAppData.producersCount--;
      });
    });
    transport.observer.on('newconsumer', (consumer) => {
      transportAppData.consumersCount++;
      consumer.observer.on('close', () => {
        transportAppData.consumersCount--;
      });
    });
    transport.observer.on('newdataproducer', (dataProducer) => {
      transportAppData.dataProducersCount++;
      dataProducer.observer.on('close', () => {
        transportAppData.dataProducersCount--;
      });
    });
    transport.observer.on('newdataconsumer', (dataConsumer) => {
      transportAppData.dataConsumersCount++;
      dataConsumer.observer.on('close', () => {
        transportAppData.dataConsumersCount--;
      });
    });
    this.transports.set(transportAppData.id, transport);
    this.logger.log(`transport ${transportAppData.id} created`);
    return transportAppData;
  }
  getTransport(
    id: string,
  ): Transport<AppData, TransportEvents, TransportObserverEvents> {
    const transport = this.transports.get(id);
    if (!transport) {
      throw new NotFoundException(`transport ${id} not found`);
    }
    return transport;
  }
}
