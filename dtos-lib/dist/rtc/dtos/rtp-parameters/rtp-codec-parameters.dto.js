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
exports.RtpCodecParametersDto = void 0;
const classes_1 = require("@automapper/classes");
const swagger_1 = require("@nestjs/swagger");
const dtos_1 = require("../../../rtc/dtos");
class RtpCodecParametersDto {
}
exports.RtpCodecParametersDto = RtpCodecParametersDto;
__decorate([
    (0, classes_1.AutoMap)(),
    (0, swagger_1.ApiPropertyOptional)({ example: 1 }),
    __metadata("design:type", Number)
], RtpCodecParametersDto.prototype, "channels", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, swagger_1.ApiProperty)({ example: 48000 }),
    __metadata("design:type", Number)
], RtpCodecParametersDto.prototype, "clockRate", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, swagger_1.ApiProperty)({ example: 'audio/opus' }),
    __metadata("design:type", String)
], RtpCodecParametersDto.prototype, "mimeType", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, swagger_1.ApiPropertyOptional)({ example: { useinbandfec: 1 } }),
    __metadata("design:type", Object)
], RtpCodecParametersDto.prototype, "parameters", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, swagger_1.ApiProperty)({ example: 100 }),
    __metadata("design:type", Number)
], RtpCodecParametersDto.prototype, "payloadType", void 0);
__decorate([
    (0, classes_1.AutoMap)(() => dtos_1.RtcpFeedbackDto),
    (0, swagger_1.ApiPropertyOptional)({ type: dtos_1.RtcpFeedbackDto, isArray: true }),
    __metadata("design:type", Array)
], RtpCodecParametersDto.prototype, "rtcpFeedback", void 0);
