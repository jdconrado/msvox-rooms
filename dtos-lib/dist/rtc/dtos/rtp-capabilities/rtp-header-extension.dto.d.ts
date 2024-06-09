export declare class RtpHeaderExtensionDto {
    uri: 'urn:ietf:params:rtp-hdrext:sdes:mid' | 'urn:ietf:params:rtp-hdrext:sdes:rtp-stream-id' | 'urn:ietf:params:rtp-hdrext:sdes:repaired-rtp-stream-id' | 'http://tools.ietf.org/html/draft-ietf-avtext-framemarking-07' | 'urn:ietf:params:rtp-hdrext:framemarking' | 'urn:ietf:params:rtp-hdrext:ssrc-audio-level' | 'urn:3gpp:video-orientation' | 'urn:ietf:params:rtp-hdrext:toffset' | 'http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01' | 'http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time' | 'http://www.webrtc.org/experiments/rtp-hdrext/abs-capture-time';
    direction?: 'sendrecv' | 'sendonly' | 'recvonly' | 'inactive';
    kind: 'audio' | 'video';
    preferredEncrypt?: boolean;
    preferredId: number;
}
