import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { RtcpFeedbackDto } from '../../../rtc/dtos/rtp-capabilities/rtcp-feedback.dto';

export class RtpCodecCapabilityDto {
  @ApiProperty({ example: 'audio/opus' })
  @AutoMap()
  mimeType: string;

  @ApiPropertyOptional({ example: 100 })
  @AutoMap()
  preferredPayloadType?: number;

  @ApiProperty({ example: 48000 })
  @AutoMap()
  clockRate: number;

  @ApiProperty({ example: 2 })
  @AutoMap()
  channels?: number;

  @ApiProperty({ example: { useinbandfec: 1 } })
  @AutoMap()
  parameters?: any;

  @ApiProperty({ example: '10-20;30-60' })
  @AutoMap()
  rtcpFeedback?: RtcpFeedbackDto[];

  @AutoMap()
  @ApiProperty({ example: 0 })
  kind: 'audio' | 'video';
}
