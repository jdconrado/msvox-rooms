import { RtpParametersDto } from '@api/rtc/dtos/rtp-parameters';

export class CreateSessionProducerCommand {
  constructor(
    public readonly sessionId: string,
    public readonly kind: 'audio' | 'video',
    public readonly rtpParameters: RtpParametersDto,
  ) {}
}
