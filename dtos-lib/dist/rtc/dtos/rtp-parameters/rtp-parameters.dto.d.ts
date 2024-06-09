import { RtpCodecParametersDto } from '../../../rtc/dtos/rtp-parameters/rtp-codec-parameters.dto';
import { RtpEncodingParametersDto } from '../../../rtc/dtos/rtp-parameters/rtp-encoding-parameters.dto';
import { RtpHeaderExtensionParametersDto } from '../../../rtc/dtos/rtp-parameters/rtp-header-extension-parameters.dto';
import { RtcpParametersDto } from '../../../rtc/dtos/rtp-parameters/rtcp-parameters.dto';
export declare class RtpParametersDto {
    codecs: RtpCodecParametersDto[];
    encodings?: RtpEncodingParametersDto[];
    headerExtensions?: RtpHeaderExtensionParametersDto[];
    mid?: string;
    rtcp?: RtcpParametersDto;
}
