import { AutoMap } from '@automapper/classes';

export class DtlsFingerprintDto {
  @AutoMap()
  algorithm: 'sha-1' | 'sha-224' | 'sha-256' | 'sha-384' | 'sha-512';

  @AutoMap()
  value: string;
}
