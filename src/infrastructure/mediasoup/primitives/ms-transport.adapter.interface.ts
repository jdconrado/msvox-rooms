import { Transport } from 'mediasoup/node/lib/Transport';
import { IMsTransportWebrtcOptions } from '@infra/mediasoup/ms-transport-webrtc-options.interface';

export type TransportOptions = IMsTransportWebrtcOptions | undefined;
export interface IMSTransportAdapter {
  getTransportsData(): Array<MSTransportAppData>;
  getTransportData(id: string): MSTransportAppData | undefined;
  createTransport(input: {
    routerId: string;
    type: MSTransportType;
    options?: object;
  }): Promise<[MSTransportAppData, TransportOptions]>;
  getTransport(id: string): Transport;
}

export enum MSTransportType {
  WEB_RTC = 'webRTC',
  PLAIN = 'plain',
  DIRECT = 'direct',
  PIPE = 'pipe',
}

export class MSTransportAppData {
  id: string;
  routerId: string;
  type: MSTransportType;
  maxConsumers: number;
  consumersCount: number;
  maxProducers: number;
  producersCount: number;
  maxDataProducers: number;
  dataProducersCount: number;
  maxDataConsumers: number;
  dataConsumersCount: number;
  [key: string]: any;

  constructor(input: Required<MSTransportAppData>) {
    Object.assign(this, input);
  }
}
