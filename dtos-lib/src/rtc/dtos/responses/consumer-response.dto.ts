import { AutoMap } from '@automapper/classes';
import { RtpParametersDto } from '../../../rtc/dtos/rtp-parameters';

export class ConsumerResponseDto {
  @AutoMap()
  id: string;

  @AutoMap()
  producerId: string;

  @AutoMap()
  kind: 'audio' | 'video';

  @AutoMap(() => RtpParametersDto)
  rtpParameters: RtpParametersDto;
}
