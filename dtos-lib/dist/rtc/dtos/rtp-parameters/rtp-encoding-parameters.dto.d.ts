export declare class RtpEncodingParametersDto {
    ssrc?: number;
    rid?: string;
    codecPayloadType?: number;
    rtx?: {
        ssrc: number;
    };
    dtx?: boolean;
    scalabilityMode?: string;
    scaleResolutionDownBy?: number;
    maxBitrate?: number;
}
