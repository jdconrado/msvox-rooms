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
  TransportOptions,
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
import * as crypto from 'crypto';
import { APP_VARIABLES } from '@config/app-variables.config';

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
  }): Promise<[MSTransportAppData, TransportOptions]> {
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
    let options: TransportOptions = undefined;
    switch (input.type) {
      case MSTransportType.WEB_RTC:
        if (workerData.webRTCServer) {
          const webRtcTransport = await router.createWebRtcTransport({
            webRtcServer: workerData.webRTCServer,
            enableUdp: true,
            enableTcp: false,
            appData: transportAppData,
          });

          // map options
          transportAppData.id = webRtcTransport.id;
          const iceServers = this.getTurnServers(webRtcTransport.id);
          options = {
            id: webRtcTransport.id,
            iceServers,
            iceTransportPolicy: iceServers ? 'relay' : 'all',
            iceParameters: webRtcTransport.iceParameters,
            iceCandidates: webRtcTransport.iceCandidates,
            dtlsParameters: webRtcTransport.dtlsParameters,
            sctpParameters: webRtcTransport.sctpParameters,
          };
          transport = webRtcTransport;
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

    return [transportAppData, options];
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

  /**
   * Generate TURN credentials
   * @param {string} secret - The secret key used to generate the HMAC
   * @param {number} ttl - Time to live for the credentials in seconds
   * @returns {Object} - An object containing the username and password
   */
  generateTurnCredentials(transportId: string, ttl = 7200, secret?: string) {
    if (!secret) {
      secret = APP_VARIABLES.MEDIASOUP_TURN_SECRET;
    }
    const timestamp = Math.floor(Date.now() / 1000) + ttl;
    const username = `${timestamp}:${transportId}`;
    const hmac = crypto.createHmac('sha1', secret);
    hmac.update(username);
    const password = hmac.digest('base64');
    return { username, password };
  }

  getTurnServers(transportId: string) {
    if (!APP_VARIABLES.MEDIASOUP_TURN_HOST) {
      return;
    }
    const { username, password } = this.generateTurnCredentials(transportId);
    return [
      {
        urls: [
          `turn:${APP_VARIABLES.MEDIASOUP_TURN_HOST}:5349`,
          `stun:${APP_VARIABLES.MEDIASOUP_TURN_HOST}:5349`,
        ],
        username,
        credential: password,
      },
    ];
  }
}
