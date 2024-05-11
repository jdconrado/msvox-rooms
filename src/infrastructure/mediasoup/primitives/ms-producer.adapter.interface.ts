import { Producer } from 'mediasoup/node/lib/Producer';
import { RtpParameters } from 'mediasoup/node/lib/RtpParameters';

export interface IMSProducerAdapter {
  createProducer(input: {
    transportId: string;
    kind: 'audio' | 'video';
    rtpParameters: RtpParameters;
    options?: { clientAppData?: object };
  }): Promise<MSProducerAppData>;
  getProducersData(): Array<MSProducerAppData>;
  getProducerData(producerId: string): MSProducerAppData | undefined;
  getProducer(producerId: string): Producer;
}

export class MSProducerAppData {
  id: string;
  routerId: string;
  transportId: string;
  kind: 'audio' | 'video';
  rtpParameters: RtpParameters;
  paused: boolean;
  [key: string]: any;

  constructor(input: Required<MSProducerAppData>) {
    Object.assign(this, input);
  }
}
