import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { RtcpFeedbackDto } from '../../../rtc/dtos';

export class RtpCodecParametersDto {
  @AutoMap()
  @ApiPropertyOptional({ example: 1 })
  channels?: number;

  @AutoMap()
  @ApiProperty({ example: 48000 })
  clockRate: number;

  @AutoMap()
  @ApiProperty({ example: 'audio/opus' })
  mimeType: string;

  @AutoMap()
  @ApiPropertyOptional({ example: { useinbandfec: 1 } })
  parameters?: any;

  @AutoMap()
  @ApiProperty({ example: 100 })
  payloadType: number;

  @AutoMap(() => RtcpFeedbackDto)
  @ApiPropertyOptional({ type: RtcpFeedbackDto, isArray: true })
  rtcpFeedback?: RtcpFeedbackDto[];
}
