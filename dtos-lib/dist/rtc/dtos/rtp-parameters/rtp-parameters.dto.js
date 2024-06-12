"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RtpParametersDto = void 0;
const rtp_codec_parameters_dto_1 = require("../../../rtc/dtos/rtp-parameters/rtp-codec-parameters.dto");
const rtp_encoding_parameters_dto_1 = require("../../../rtc/dtos/rtp-parameters/rtp-encoding-parameters.dto");
const rtp_header_extension_parameters_dto_1 = require("../../../rtc/dtos/rtp-parameters/rtp-header-extension-parameters.dto");
const classes_1 = require("@automapper/classes");
const rtcp_parameters_dto_1 = require("../../../rtc/dtos/rtp-parameters/rtcp-parameters.dto");
class RtpParametersDto {
}
exports.RtpParametersDto = RtpParametersDto;
__decorate([
    (0, classes_1.AutoMap)(() => rtp_codec_parameters_dto_1.RtpCodecParametersDto),
    __metadata("design:type", Array)
], RtpParametersDto.prototype, "codecs", void 0);
__decorate([
    (0, classes_1.AutoMap)(() => rtp_encoding_parameters_dto_1.RtpEncodingParametersDto),
    __metadata("design:type", Array)
], RtpParametersDto.prototype, "encodings", void 0);
__decorate([
    (0, classes_1.AutoMap)(() => rtp_header_extension_parameters_dto_1.RtpHeaderExtensionParametersDto),
    __metadata("design:type", Array)
], RtpParametersDto.prototype, "headerExtensions", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], RtpParametersDto.prototype, "mid", void 0);
__decorate([
    (0, classes_1.AutoMap)(() => rtcp_parameters_dto_1.RtcpParametersDto),
    __metadata("design:type", rtcp_parameters_dto_1.RtcpParametersDto)
], RtpParametersDto.prototype, "rtcp", void 0);
