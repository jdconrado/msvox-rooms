import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RtpHeaderExtensionDto {
  @AutoMap()
  @ApiProperty({ example: 'urn:ietf:params:rtp-hdrext:sdes:mid' })
  uri:
    | 'urn:ietf:params:rtp-hdrext:sdes:mid'
    | 'urn:ietf:params:rtp-hdrext:sdes:rtp-stream-id'
    | 'urn:ietf:params:rtp-hdrext:sdes:repaired-rtp-stream-id'
    | 'http://tools.ietf.org/html/draft-ietf-avtext-framemarking-07'
    | 'urn:ietf:params:rtp-hdrext:framemarking'
    | 'urn:ietf:params:rtp-hdrext:ssrc-audio-level'
    | 'urn:3gpp:video-orientation'
    | 'urn:ietf:params:rtp-hdrext:toffset'
    | 'http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01'
    | 'http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time'
    | 'http://www.webrtc.org/experiments/rtp-hdrext/abs-capture-time';

  @AutoMap()
  @ApiProperty({ example: 'sendrecv' })
  direction?: 'sendrecv' | 'sendonly' | 'recvonly' | 'inactive';

  @AutoMap()
  @ApiProperty({ example: 0 })
  kind: 'audio' | 'video';

  @AutoMap()
  @ApiPropertyOptional({ example: true })
  preferredEncrypt?: boolean;

  @AutoMap()
  @ApiProperty({ example: 1 })
  preferredId: number;
}
