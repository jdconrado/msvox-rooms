import { AutoMap } from '@automapper/classes';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class RtpEncodingParametersDto {
  @AutoMap()
  @ApiPropertyOptional({ example: 1 })
  ssrc?: number;

  @AutoMap()
  @ApiPropertyOptional({ example: 'low' })
  rid?: string;

  @AutoMap()
  @ApiPropertyOptional({ example: 1 })
  codecPayloadType?: number;

  @AutoMap()
  @ApiPropertyOptional({ example: { ssrc: 1 } })
  rtx?: {
    ssrc: number;
  };

  @AutoMap()
  @ApiPropertyOptional({ example: true })
  dtx?: boolean;

  @AutoMap()
  @ApiPropertyOptional({ example: 'L1T3' })
  scalabilityMode?: string;

  @AutoMap()
  @ApiPropertyOptional({ example: 1 })
  scaleResolutionDownBy?: number;

  @AutoMap()
  @ApiPropertyOptional({ example: 1 })
  maxBitrate?: number;
}
