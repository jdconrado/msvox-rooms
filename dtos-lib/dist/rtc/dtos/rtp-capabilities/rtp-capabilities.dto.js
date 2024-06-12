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
exports.RtpCapabilitiesDto = void 0;
const rtp_header_extension_dto_1 = require("../../../rtc/dtos/rtp-capabilities/rtp-header-extension.dto");
const rtp_codec_capability_dto_1 = require("../../../rtc/dtos/rtp-capabilities/rtp-codec-capability.dto");
const class_transformer_1 = require("class-transformer");
const classes_1 = require("@automapper/classes");
class RtpCapabilitiesDto {
}
exports.RtpCapabilitiesDto = RtpCapabilitiesDto;
__decorate([
    (0, classes_1.AutoMap)(),
    (0, class_transformer_1.Type)(() => rtp_codec_capability_dto_1.RtpCodecCapabilityDto),
    __metadata("design:type", Array)
], RtpCapabilitiesDto.prototype, "codecs", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, class_transformer_1.Type)(() => rtp_header_extension_dto_1.RtpHeaderExtensionDto),
    __metadata("design:type", Array)
], RtpCapabilitiesDto.prototype, "headerExtensions", void 0);
