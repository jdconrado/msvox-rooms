import { RtpHeaderExtensionDto } from '../../../rtc/dtos/rtp-capabilities/rtp-header-extension.dto';

import { RtpCodecCapabilityDto } from '../../../rtc/dtos/rtp-capabilities/rtp-codec-capability.dto';
import { Type } from 'class-transformer';
import { AutoMap } from '@automapper/classes';

export class RtpCapabilitiesDto {
  @AutoMap()
  @Type(() => RtpCodecCapabilityDto)
  codecs?: RtpCodecCapabilityDto[];

  @AutoMap()
  @Type(() => RtpHeaderExtensionDto)
  headerExtensions?: RtpHeaderExtensionDto[];
}
