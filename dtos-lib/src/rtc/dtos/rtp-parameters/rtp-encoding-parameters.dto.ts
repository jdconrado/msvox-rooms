import { AutoMap } from '@automapper/classes';

export class RtpEncodingParametersDto {
  @AutoMap()
  ssrc?: number;

  @AutoMap()
  rid?: string;

  @AutoMap()
  codecPayloadType?: number;

  @AutoMap()
  rtx?: {
    ssrc: number;
  };

  @AutoMap()
  dtx?: boolean;

  @AutoMap()
  scalabilityMode?: string;

  @AutoMap()
  scaleResolutionDownBy?: number;

  @AutoMap()
  maxBitrate?: number;
}
