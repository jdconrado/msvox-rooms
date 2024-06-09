import { AutoMap } from '@automapper/classes';
import { RtpParametersDto } from '@api/rtc/dtos/rtp-parameters';
import { ApiProperty } from '@nestjs/swagger';

export class ConsumerResponseDto {
  @AutoMap()
  @ApiProperty({ example: 'consumer-id' })
  id: string;

  @AutoMap()
  @ApiProperty({ example: 'producer-id' })
  producerId: string;

  @AutoMap()
  @ApiProperty({ example: 'audio' })
  kind: 'audio' | 'video';

  @AutoMap(() => RtpParametersDto)
  @ApiProperty({ type: RtpParametersDto })
  rtpParameters: RtpParametersDto;
}
