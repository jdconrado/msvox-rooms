import { AutoMap } from '@automapper/classes';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class RtcpParametersDto {
  @AutoMap()
  @ApiPropertyOptional({ example: 'cname' })
  cname?: string;

  @AutoMap()
  @ApiPropertyOptional({ example: true })
  reducedSize?: boolean;
}
