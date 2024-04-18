import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import {
  IMSWorkerAdapter,
  MSWorkerAppData,
  MSWorkerRole,
} from 'src/infrastructure/mediasoup/primitives/ms-worker.adapter.interface';
import { cpus } from 'os';
import * as mediasoup from 'mediasoup';
import { APP_VARIABLES } from 'src/config/app-variables.config';
import { Worker, WorkerLogLevel } from 'mediasoup/node/lib/types';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MSWorkerAdapterService implements IMSWorkerAdapter {
  private readonly logger = new Logger(MSWorkerAdapterService.name);
  private initiated: boolean = false;

  private workers: Map<string, Worker> = new Map();
  private readonly maxWorkers = cpus().length;
  private readonly scaleWorkersAtRouterThreshold = 0.75;

  constructor() {
    this.instantiateWorkers()
      .then(() => (this.initiated = true))
      .catch((err) => this.logger.error(err));
  }

  isInitiated(): boolean {
    return this.initiated;
  }

  getWorkersData(): MSWorkerAppData[] {
    return Array.from(this.workers.values()).map(
      (worker) => worker.appData as MSWorkerAppData,
    );
  }
  getWorkerData(workerId: string): MSWorkerAppData {
    const worker = this.workers.get(workerId);
    if (!worker) {
      throw new NotFoundException(`worker ${workerId} not found`);
    }
    return worker.appData as MSWorkerAppData;
  }
  getWorker(workerId: string): mediasoup.types.Worker<mediasoup.types.AppData> {
    const worker = this.workers.get(workerId);
    if (!worker) {
      throw new NotFoundException(`worker ${workerId} not found`);
    }
    return worker;
  }

  async instantiateWorkers(num?: number): Promise<void> {
    const numWorkers = num && num <= this.maxWorkers ? num : this.maxWorkers;
    for (let i = 0; i < numWorkers; i++) {
      const data = new MSWorkerAppData({
        id: uuidv4(),
        role: MSWorkerRole.GENERAL,
        maxRouters: APP_VARIABLES.MEDIASOUP_MAX_ROUTERS_PER_WORKER,
        currentRouters: 0,
        webRTCServer: null,
      });
      const worker = await mediasoup.createWorker({
        logLevel: APP_VARIABLES.LOG_LEVEL as WorkerLogLevel,
        rtcMinPort: 10000,
        rtcMaxPort: 10100,
        appData: data,
      });
      worker.observer.on('newrouter', (router) => {
        data.currentRouters++;
        if (
          data.currentRouters >=
            this.scaleWorkersAtRouterThreshold *
              APP_VARIABLES.MEDIASOUP_MAX_ROUTERS_PER_WORKER &&
          this.workers.size < this.maxWorkers
        ) {
          this.instantiateWorkers(1);
        }
        router.observer.on('close', () => {
          data.currentRouters--;
        });
      });
      const webRtcServer = await worker.createWebRtcServer({
        listenInfos: [
          {
            ip: APP_VARIABLES.MEDIASOUP_LISTEN_IP,
            announcedIp: APP_VARIABLES.MEDISOUP_ANOUNCED_IP,
            protocol: 'udp',
          },
          {
            ip: APP_VARIABLES.MEDIASOUP_LISTEN_IP,
            announcedIp: APP_VARIABLES.MEDISOUP_ANOUNCED_IP,
            protocol: 'tcp',
          },
        ],
      });
      data.webRTCServer = webRtcServer;
      this.logger.log(`worker ${data.id} created`);
      this.workers.set(data.id, worker);
    }
  }
}
