import { RtcpFeedbackDto } from '../../../rtc/dtos/rtp-capabilities/rtcp-feedback.dto';
export declare class RtpCodecCapabilityDto {
    mimeType: string;
    preferredPayloadType?: number;
    clockRate: number;
    channels?: number;
    parameters?: any;
    rtcpFeedback?: RtcpFeedbackDto[];
    kind: 'audio' | 'video';
}
