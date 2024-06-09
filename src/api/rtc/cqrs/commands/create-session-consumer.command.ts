import { RtpCapabilitiesDto } from '@api/rtc/dtos';

export class CreateSessionConsumerCommand {
  constructor(
    public readonly sessionId: string,
    public readonly participantId: string,
    public readonly rtpCapabilities: RtpCapabilitiesDto,
  ) {}
}
