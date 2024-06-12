import { DtlsParametersDto } from '@api/rtc/dtos/transport-options/dtls';
import {
  IceCandidateDto,
  IceParametersDto,
  IceServerDto,
} from '@api/rtc/dtos/transport-options/ice';
import { SctpParametersDto } from '@api/rtc/dtos/transport-options/sctp';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class WebTransportOptionsDto {
  @AutoMap(() => DtlsParametersDto)
  @ApiProperty({ type: DtlsParametersDto })
  dtlsParameters: DtlsParametersDto;

  @AutoMap()
  @ApiProperty({ type: IceCandidateDto, isArray: true })
  iceCandidates: IceCandidateDto[];

  @AutoMap()
  @ApiProperty({ type: IceParametersDto })
  iceParameters: IceParametersDto;

  @AutoMap()
  @ApiProperty({ type: IceServerDto, isArray: true })
  iceServers?: IceServerDto[];

  @AutoMap()
  @ApiProperty({ example: 'all' })
  iceTransportPolicy: 'all' | 'relay';

  @AutoMap()
  @ApiProperty({ example: 'transportId' })
  id: string;

  @AutoMap()
  @ApiProperty({ type: SctpParametersDto })
  sctpParameters: SctpParametersDto;
}
