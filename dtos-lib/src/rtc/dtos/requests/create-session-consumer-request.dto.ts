import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString, ValidateNested } from 'class-validator';
import { RtpCapabilitiesDto } from '../../../rtc/dtos/rtp-capabilities';

export class CreateSessionConsumerRequestDto {
  @AutoMap()
  @IsDefined()
  @IsString()
  @ApiProperty({ example: 'participantId' })
  participantId: string;

  @AutoMap(() => RtpCapabilitiesDto)
  @IsDefined()
  @ValidateNested()
  @ApiProperty({ type: RtpCapabilitiesDto })
  rtpCapabilities: RtpCapabilitiesDto;
}
