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
exports.ConsumerResponseDto = void 0;
const classes_1 = require("@automapper/classes");
const rtp_parameters_1 = require("../../../rtc/dtos/rtp-parameters");
const swagger_1 = require("@nestjs/swagger");
class ConsumerResponseDto {
}
exports.ConsumerResponseDto = ConsumerResponseDto;
__decorate([
    (0, classes_1.AutoMap)(),
    (0, swagger_1.ApiProperty)({ example: 'consumer-id' }),
    __metadata("design:type", String)
], ConsumerResponseDto.prototype, "id", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, swagger_1.ApiProperty)({ example: 'producer-id' }),
    __metadata("design:type", String)
], ConsumerResponseDto.prototype, "producerId", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, swagger_1.ApiProperty)({ example: 'audio' }),
    __metadata("design:type", String)
], ConsumerResponseDto.prototype, "kind", void 0);
__decorate([
    (0, classes_1.AutoMap)(() => rtp_parameters_1.RtpParametersDto),
    (0, swagger_1.ApiProperty)({ type: rtp_parameters_1.RtpParametersDto }),
    __metadata("design:type", rtp_parameters_1.RtpParametersDto)
], ConsumerResponseDto.prototype, "rtpParameters", void 0);
