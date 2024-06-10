import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';

// TODO: Review compatibility with interface IceCandidate from mediasoup
export class IceCandidateDto {
  @AutoMap()
  @ApiProperty({ example: 'candidate:0 1 UDP 21222525' })
  foundation: string;

  @AutoMap()
  @ApiProperty({ example: '192.0.0.1' })
  ip: string;

  @AutoMap()
  @ApiProperty({ example: 10000 })
  port: number;

  @AutoMap()
  @ApiProperty({ example: 1 })
  priority: number;

  @AutoMap()
  @ApiProperty({ example: 'udp' })
  protocol: 'udp' | 'tcp';

  @AutoMap()
  @ApiProperty({ example: 'pasive' })
  tcpType?: 'passive';

  @AutoMap()
  @ApiProperty({ example: 'host' })
  type: 'host';
}
