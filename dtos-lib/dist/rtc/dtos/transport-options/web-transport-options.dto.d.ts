import { DtlsParametersDto } from '../../../rtc/dtos/transport-options/dtls';
import { IceCandidateDto, IceParametersDto, IceServerDto } from '../../../rtc/dtos/transport-options/ice';
import { SctpParametersDto } from '../../../rtc/dtos/transport-options/sctp';
export declare class WebTransportOptionsDto {
    dtlsParameters: DtlsParametersDto;
    iceCandidates: IceCandidateDto[];
    iceParameters: IceParametersDto;
    iceServers?: IceServerDto[];
    iceTransportPolicy: 'all' | 'relay';
    id: string;
    sctpParameters: SctpParametersDto;
}
