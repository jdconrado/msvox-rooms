import { Consumer } from 'mediasoup/node/lib/Consumer';
import { RtpCapabilities } from 'mediasoup/node/lib/RtpParameters';

export interface IMSConsumerAdapter {
  createConsumer(input: {
    transportId: string;
    producerId: string;
    rtpCapabilities: RtpCapabilities;
    options?: { clientAppData?: object };
  }): Promise<MSConsumerAppData>;
  getConsumer(consumerId: string): Consumer;
  getConsumerData(consumerId: string): MSConsumerAppData | undefined;
  getConsumersData(): Array<MSConsumerAppData>;
}

export class MSConsumerAppData {
  id: string;
  routerId: string;
  transportId: string;
  producerId: string;
  kind: 'audio' | 'video';
  rtpParameters: RtpCapabilities;
  paused: boolean;
  [key: string]: any;

  constructor(input: Required<MSConsumerAppData>) {
    Object.assign(this, input);
  }
}
