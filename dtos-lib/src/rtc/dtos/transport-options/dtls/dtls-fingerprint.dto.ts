import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class DtlsFingerprintDto {
  @AutoMap()
  @ApiProperty({ example: 'sha-256' })
  algorithm: 'sha-1' | 'sha-224' | 'sha-256' | 'sha-384' | 'sha-512';

  @AutoMap()
  @ApiProperty({ example: 'A2:94:7A:4C:3A:3' })
  value: string;
}
