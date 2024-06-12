import { AutoMap } from '@automapper/classes';

import { RtpParametersDto } from '../../../rtc/dtos/rtp-parameters';
import { IsDefined, IsEnum, ValidateNested } from 'class-validator';

export class CreateSessionProducerRequestDto {
  @AutoMap()
  @IsDefined()
  @IsEnum(['audio', 'video'])
  kind: 'audio' | 'video';

  @AutoMap(() => RtpParametersDto)
  @IsDefined()
  @ValidateNested()
  rtpParameters: RtpParametersDto;
}
