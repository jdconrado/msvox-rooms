import {
  DtlsParameters,
  IceCandidate,
  IceParameters,
} from 'mediasoup/node/lib/WebRtcTransport';
import { SctpParameters } from 'mediasoup/node/lib/SctpParameters';

export interface IMsTransportWebrtcOptions {
  id: string;
  iceParameters: IceParameters;
  iceCandidates: IceCandidate[];
  iceServers?: RTCIceServer[];
  iceTransportPolicy: 'all' | 'relay';
  dtlsParameters: DtlsParameters;
  sctpParameters: SctpParameters;
}
