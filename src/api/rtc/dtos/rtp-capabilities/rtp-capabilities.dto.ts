import { RtpHeaderExtensionDto } from '@api/rtc/dtos/rtp-capabilities/rtp-header-extension.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { RtpCodecCapabilityDto } from '@api/rtc/dtos/rtp-capabilities/rtp-codec-capability.dto';
import { Type } from 'class-transformer';
import { AutoMap } from '@automapper/classes';

export class RtpCapabilitiesDto {
  @AutoMap()
  @ApiPropertyOptional({ type: RtpCodecCapabilityDto, isArray: true })
  @Type(() => RtpCodecCapabilityDto)
  codecs?: RtpCodecCapabilityDto[];

  @AutoMap()
  @ApiProperty({ type: RtpHeaderExtensionDto, isArray: true })
  @Type(() => RtpHeaderExtensionDto)
  headerExtensions?: RtpHeaderExtensionDto[];
}
