import { DtlsParametersDto } from '../../../rtc/dtos/transport-options/dtls';
import { IceCandidateDto, IceParametersDto } from '../../../rtc/dtos/transport-options/ice';
import { SctpParametersDto } from '../../../rtc/dtos/transport-options/sctp';
export declare class WebTransportOptionsDto {
    dtlsParameters: DtlsParametersDto;
    iceCandidates: IceCandidateDto[];
    iceParameters: IceParametersDto;
    id: string;
    sctpParameters: SctpParametersDto;
}
