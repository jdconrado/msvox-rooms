export declare class IceCandidateDto {
    foundation: string;
    ip: string;
    address: number;
    port: number;
    priority: number;
    protocol: 'udp' | 'tcp';
    tcpType?: 'passive';
    type: 'host';
}
