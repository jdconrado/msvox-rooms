import { DtlsFingerprintDto } from './dtls-fingerprint.dto';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class DtlsParametersDto {
  @AutoMap(() => [DtlsFingerprintDto])
  @ApiProperty({ type: [DtlsFingerprintDto] })
  fingerprints: DtlsFingerprintDto[];

  @AutoMap()
  @ApiProperty({ example: 'auto' })
  role?: 'auto' | 'client' | 'server';
}
