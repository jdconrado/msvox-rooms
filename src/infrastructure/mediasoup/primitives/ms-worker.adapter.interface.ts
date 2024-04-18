import { WebRtcServer, Worker } from 'mediasoup/node/lib/types';

export interface IMSWorkerAdapter {
  getWorkersData(): Array<MSWorkerAppData>;
  getWorkerData(workerId: string): MSWorkerAppData;
  getWorker(workerId: string): Worker;
  isInitiated(): boolean;
}

export enum MSWorkerRole {
  GENERAL = 'general',
  AUDIO = 'audio',
  VIDEO = 'video',
}

export class MSWorkerAppData {
  id: string;
  role: MSWorkerRole;
  maxRouters: number;
  currentRouters: number;
  webRTCServer: WebRtcServer | null;
  [key: string]: any;

  constructor(input: Required<MSWorkerAppData>) {
    Object.assign(this, input);
  }
}
