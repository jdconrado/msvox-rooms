import { AutoMap } from '@automapper/classes';

export class RtcpParametersDto {
  @AutoMap()
  cname?: string;

  @AutoMap()
  reducedSize?: boolean;
}
