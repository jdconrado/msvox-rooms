import { RtpCodecParametersDto } from '../../../rtc/dtos/rtp-parameters/rtp-codec-parameters.dto';
import { RtpEncodingParametersDto } from '../../../rtc/dtos/rtp-parameters/rtp-encoding-parameters.dto';
import { RtpHeaderExtensionParametersDto } from '../../../rtc/dtos/rtp-parameters/rtp-header-extension-parameters.dto';
import { AutoMap } from '@automapper/classes';

import { RtcpParametersDto } from '../../../rtc/dtos/rtp-parameters/rtcp-parameters.dto';

export class RtpParametersDto {
  @AutoMap(() => RtpCodecParametersDto)
  codecs: RtpCodecParametersDto[];

  @AutoMap(() => RtpEncodingParametersDto)
  encodings?: RtpEncodingParametersDto[];

  @AutoMap(() => RtpHeaderExtensionParametersDto)
  headerExtensions?: RtpHeaderExtensionParametersDto[];

  @AutoMap()
  mid?: string;

  @AutoMap(() => RtcpParametersDto)
  rtcp?: RtcpParametersDto;
}
