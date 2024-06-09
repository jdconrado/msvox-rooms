import { DtlsFingerprintDto } from './dtls-fingerprint.dto';
export declare class DtlsParametersDto {
    fingerprints: DtlsFingerprintDto[];
    role?: 'auto' | 'client' | 'server';
}
