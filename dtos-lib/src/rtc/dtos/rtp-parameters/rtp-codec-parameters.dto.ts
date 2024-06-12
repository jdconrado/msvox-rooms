import { AutoMap } from '@automapper/classes';

import { RtcpFeedbackDto } from '../../../rtc/dtos';

export class RtpCodecParametersDto {
  @AutoMap()
  channels?: number;

  @AutoMap()
  clockRate: number;

  @AutoMap()
  mimeType: string;

  @AutoMap()
  parameters?: any;

  @AutoMap()
  payloadType: number;

  @AutoMap(() => RtcpFeedbackDto)
  rtcpFeedback?: RtcpFeedbackDto[];
}
