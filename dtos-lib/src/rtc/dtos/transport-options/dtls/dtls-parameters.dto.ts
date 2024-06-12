import { DtlsFingerprintDto } from './dtls-fingerprint.dto';
import { AutoMap } from '@automapper/classes';

export class DtlsParametersDto {
  @AutoMap(() => [DtlsFingerprintDto])
  fingerprints: DtlsFingerprintDto[];

  @AutoMap()
  role?: 'auto' | 'client' | 'server';
}
