import { AutoMap } from '@automapper/classes';
import { IsDefined, IsEnum, ValidateNested } from 'class-validator';
import { RoomSessionTransportDirectionCd } from '@domain/enums';
import { ApiProperty } from '@nestjs/swagger';
import { DtlsParametersDto } from '@api/rtc/dtos/transport-options';

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
