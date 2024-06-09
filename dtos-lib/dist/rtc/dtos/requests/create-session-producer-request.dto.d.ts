import { RtpParametersDto } from '../../../rtc/dtos/rtp-parameters';
export declare class CreateSessionProducerRequestDto {
    kind: 'audio' | 'video';
    rtpParameters: RtpParametersDto;
}
