
import { AutoMap } from '@automapper/classes';

// TODO: Review compatibility with interface IceCandidate from mediasoup
export class IceCandidateDto {
  @AutoMap()
  foundation: string;

  @AutoMap()
  ip: string;

  @AutoMap()
  address: string;

  @AutoMap()
  port: number;

  @AutoMap()
  priority: number;

  @AutoMap()
  protocol: 'udp' | 'tcp';

  @AutoMap()
  tcpType?: 'passive';

  @AutoMap()
  type: 'host';
}
