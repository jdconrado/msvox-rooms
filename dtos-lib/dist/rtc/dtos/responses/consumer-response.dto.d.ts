import { RtpParametersDto } from '../../../rtc/dtos/rtp-parameters';
export declare class ConsumerResponseDto {
    id: string;
    producerId: string;
    kind: 'audio' | 'video';
    rtpParameters: RtpParametersDto;
}
