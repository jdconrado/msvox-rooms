import { AutoMap } from '@automapper/classes';
import { IsDefined, IsEnum, ValidateNested } from 'class-validator';
import { RoomSessionTransportDirectionCd } from '../../../enums';

import { DtlsParametersDto } from '../../../rtc/dtos/transport-options';

export class ConnectSessionWebTransportRequestDto {
  @AutoMap()
  @IsEnum(RoomSessionTransportDirectionCd)
  @IsDefined()
  direction: RoomSessionTransportDirectionCd;

  @AutoMap(() => DtlsParametersDto)
  @IsDefined()
  @ValidateNested()
  dtlsParameters: DtlsParametersDto;
}
