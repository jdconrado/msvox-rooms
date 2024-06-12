import { AutoMap } from '@automapper/classes';

import { RtcpFeedbackDto } from '../../../rtc/dtos/rtp-capabilities/rtcp-feedback.dto';

export class RtpCodecCapabilityDto {
  @AutoMap()
  mimeType: string;

  @AutoMap()
  preferredPayloadType?: number;

  @AutoMap()
  clockRate: number;

  @AutoMap()
  channels?: number;

  @AutoMap()
  parameters?: any;

  @AutoMap()
  rtcpFeedback?: RtcpFeedbackDto[];

  @AutoMap()
  kind: 'audio' | 'video';
}
