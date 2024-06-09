import { RtpHeaderExtensionDto } from '../../../rtc/dtos/rtp-capabilities/rtp-header-extension.dto';
import { RtpCodecCapabilityDto } from '../../../rtc/dtos/rtp-capabilities/rtp-codec-capability.dto';
export declare class RtpCapabilitiesDto {
    codecs?: RtpCodecCapabilityDto[];
    headerExtensions?: RtpHeaderExtensionDto[];
}
