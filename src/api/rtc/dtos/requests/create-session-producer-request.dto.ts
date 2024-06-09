import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { RtpParametersDto } from '@api/rtc/dtos/rtp-parameters';
import { IsDefined, IsEnum, ValidateNested } from 'class-validator';

export class CreateSessionProducerRequestDto {
  @AutoMap()
  @IsDefined()
  @IsEnum(['audio', 'video'])
  @ApiProperty({ description: 'Kind', example: 'audio' })
  kind: 'audio' | 'video';

  @AutoMap(() => RtpParametersDto)
  @IsDefined()
  @ValidateNested()
  @ApiProperty({ description: 'RTP Parameters', type: RtpParametersDto })
  rtpParameters: RtpParametersDto;
}
