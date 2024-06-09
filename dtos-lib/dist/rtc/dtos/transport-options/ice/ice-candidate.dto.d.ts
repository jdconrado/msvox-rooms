import { IceCandidate } from 'mediasoup/node/lib/WebRtcTransport';
export declare class IceCandidateDto implements IceCandidate {
    foundation: string;
    ip: string;
    port: number;
    priority: number;
    protocol: 'udp' | 'tcp';
    tcpType?: 'passive';
    type: 'host';
}
