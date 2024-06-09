import { RtpCodecParametersDto } from '../../../rtc/dtos/rtp-parameters/rtp-codec-parameters.dto';
import { RtpEncodingParametersDto } from '../../../rtc/dtos/rtp-parameters/rtp-encoding-parameters.dto';
import { RtpHeaderExtensionParametersDto } from '../../../rtc/dtos/rtp-parameters/rtp-header-extension-parameters.dto';
import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { RtcpParametersDto } from '../../../rtc/dtos/rtp-parameters/rtcp-parameters.dto';

export class RtpParametersDto {
  @AutoMap(() => RtpCodecParametersDto)
  @ApiProperty({ type: RtpCodecParametersDto, isArray: true })
  codecs: RtpCodecParametersDto[];

  @AutoMap(() => RtpEncodingParametersDto)
  @ApiPropertyOptional({ type: RtpEncodingParametersDto, isArray: true })
  encodings?: RtpEncodingParametersDto[];

  @AutoMap(() => RtpHeaderExtensionParametersDto)
  @ApiPropertyOptional({ type: RtpHeaderExtensionParametersDto, isArray: true })
  headerExtensions?: RtpHeaderExtensionParametersDto[];

  @AutoMap()
  @ApiPropertyOptional({ example: 'audio' })
  mid?: string;

  @AutoMap(() => RtcpParametersDto)
  @ApiPropertyOptional({ type: RtcpParametersDto })
  rtcp?: RtcpParametersDto;
}
