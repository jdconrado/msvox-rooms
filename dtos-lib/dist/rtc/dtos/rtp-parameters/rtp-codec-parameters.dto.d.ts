import { RtcpFeedbackDto } from '../../../rtc/dtos';
export declare class RtpCodecParametersDto {
    channels?: number;
    clockRate: number;
    mimeType: string;
    parameters?: any;
    payloadType: number;
    rtcpFeedback?: RtcpFeedbackDto[];
}
