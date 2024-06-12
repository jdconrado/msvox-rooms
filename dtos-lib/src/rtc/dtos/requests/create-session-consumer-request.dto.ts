import { AutoMap } from '@automapper/classes';

import { IsDefined, IsString, ValidateNested } from 'class-validator';
import { RtpCapabilitiesDto } from '../../../rtc/dtos/rtp-capabilities';

export class CreateSessionConsumerRequestDto {
  @AutoMap()
  @IsDefined()
  @IsString()
  participantId: string;

  @AutoMap(() => RtpCapabilitiesDto)
  @IsDefined()
  @ValidateNested()
  rtpCapabilities: RtpCapabilitiesDto;
}
