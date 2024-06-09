import { Router } from 'mediasoup/node/lib/Router';

export interface IMSRouterAdapter {
  getRoutersData(): Array<MSRouterAppData>;
  getRouterData(routerId: string): MSRouterAppData | null;
  createRouter(options?: {
    workerId?: string;
    role?: MSRouterRole;
  }): Promise<MSRouterAppData>;
  getRouter(routerId: string): Router;
}

export enum MSRouterRole {
  GENERAL = 'general',
  AUDIO = 'audio',
  VIDEO = 'video',
  // Add other roles as needed
}

export class MSRouterAppData {
  id: string;
  role: MSRouterRole;
  workerId: string;
  maxTransports: number;
  transportsCount: number;
  [key: string]: any;

  constructor(input: Required<MSRouterAppData>) {
    Object.assign(this, input);
  }
}
