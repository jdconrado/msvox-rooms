import {
  Injectable,
  Logger,
  NotFoundException,
  PreconditionFailedException,
} from '@nestjs/common';
import { Router, AppData, RtpCodecCapability } from 'mediasoup/node/lib/types';
import {
  IMSRouterAdapter,
  MSRouterAppData,
  MSRouterRole,
  MSWorkerAppData,
  MSWorkerRole,
} from '@infra/mediasoup/primitives';
import { MSWorkerAdapter } from './ms-worker.adapter';
import { v4 as uuidv4 } from 'uuid';
import { APP_VARIABLES } from '@config/app-variables.config';
import { MediaKind } from 'mediasoup/node/lib/fbs/rtp-parameters';

@Injectable()
export class MSRouterAdapter implements IMSRouterAdapter {
  private readonly logger = new Logger(MSRouterAdapter.name);
  private readonly routers: Map<string, Router> = new Map();

  constructor(private readonly msWorkerAdapter: MSWorkerAdapter) {}

  getRoutersData(): MSRouterAppData[] {
    return Array.from(this.routers.values()).map(
      (worker) => worker.appData as MSRouterAppData,
    );
  }
  getRouterData(routerId: string): MSRouterAppData {
    const router = this.routers.get(routerId);
    if (!router) {
      throw new NotFoundException(`router ${routerId} not found`);
    }
    return router.appData as MSRouterAppData;
  }
  async createRouter(options?: {
    workerId?: string;
    role?: MSRouterRole;
  }): Promise<MSRouterAppData> {
    const filter = (worker: MSWorkerAppData) => {
      return (
        ((options?.role && (worker.role as string) === options.role) ||
          worker.role === MSWorkerRole.GENERAL) &&
        worker.currentRouters < worker.maxRouters
      );
    };
    const workerId =
      options?.workerId ||
      this.msWorkerAdapter.getWorkersData().find(filter)?.id;
    if (!workerId) {
      throw new PreconditionFailedException('no worker available');
    }
    const worker = this.msWorkerAdapter.getWorker(workerId);
    const data = new MSRouterAppData({
      id: uuidv4(),
      role: options?.role || MSRouterRole.GENERAL,
      workerId: workerId,
      maxTransports: Infinity,
      transportsCount: 0,
    });
    let mediaCodecs = APP_VARIABLES.MEDIASOUP_MEDIA_CODECS;
    if (options.role === MSRouterRole.AUDIO) {
      mediaCodecs = mediaCodecs.filter(
        (codec) => codec.kind === MediaKind.AUDIO + '',
      );
    } else if (options.role === MSRouterRole.VIDEO) {
      mediaCodecs = mediaCodecs.filter(
        (codec) => codec.kind === MediaKind.VIDEO + '',
      );
    }
    const router = await worker.createRouter({
      mediaCodecs: mediaCodecs as RtpCodecCapability[],
      appData: data,
    });
    this.routers.set(data.id, router);
    return data;
  }
  getRouter(routerId: string): Router<AppData> {
    const router = this.routers.get(routerId);
    if (!router) {
      throw new NotFoundException(`router ${routerId} not found`);
    }
    return router;
  }
}
