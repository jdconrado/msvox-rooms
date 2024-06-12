import { DtlsParametersDto } from '../../../rtc/dtos/transport-options/dtls';
import {
  IceCandidateDto,
  IceParametersDto,
  IceServerDto,
} from '../../../rtc/dtos/transport-options/ice';
import { SctpParametersDto } from '../../../rtc/dtos/transport-options/sctp';
import { AutoMap } from '@automapper/classes';

export class WebTransportOptionsDto {
  @AutoMap(() => DtlsParametersDto)
  dtlsParameters: DtlsParametersDto;

  @AutoMap()
  iceCandidates: IceCandidateDto[];

  @AutoMap()
  iceParameters: IceParametersDto;

  @AutoMap()
  iceServers?: IceServerDto[];

  @AutoMap()
  iceTransportPolicy: 'all' | 'relay';

  @AutoMap()
  id: string;

  @AutoMap()
  sctpParameters: SctpParametersDto;
}
