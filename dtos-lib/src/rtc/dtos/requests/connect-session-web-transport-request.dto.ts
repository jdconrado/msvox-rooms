import { AutoMap } from '@automapper/classes';
import { IsDefined, IsEnum, ValidateNested } from 'class-validator';
import { RoomSessionTransportDirectionCd } from '../../../enums';
import { ApiProperty } from '@nestjs/swagger';
import { DtlsParametersDto } from '../../../rtc/dtos/transport-options';

export class ConnectSessionWebTransportRequestDto {
  @AutoMap()
  @IsEnum(RoomSessionTransportDirectionCd)
  @IsDefined()
  @ApiProperty({
    description: 'Transport Direction',
    enum: RoomSessionTransportDirectionCd,
  })
  direction: RoomSessionTransportDirectionCd;

  @AutoMap(() => DtlsParametersDto)
  @IsDefined()
  @ValidateNested()
  @ApiProperty({ type: DtlsParametersDto })
  dtlsParameters: DtlsParametersDto;
}
