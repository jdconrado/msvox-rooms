import { RoomSessionTransportDirectionCd } from '../../../enums';
import { DtlsParametersDto } from '../../../rtc/dtos/transport-options';
export declare class ConnectSessionWebTransportRequestDto {
    direction: RoomSessionTransportDirectionCd;
    dtlsParameters: DtlsParametersDto;
}
