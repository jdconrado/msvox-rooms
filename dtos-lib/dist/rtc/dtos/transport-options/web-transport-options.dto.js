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
exports.WebTransportOptionsDto = void 0;
const dtls_1 = require("../../../rtc/dtos/transport-options/dtls");
const ice_1 = require("../../../rtc/dtos/transport-options/ice");
const sctp_1 = require("../../../rtc/dtos/transport-options/sctp");
const classes_1 = require("@automapper/classes");
class WebTransportOptionsDto {
}
exports.WebTransportOptionsDto = WebTransportOptionsDto;
__decorate([
    (0, classes_1.AutoMap)(() => dtls_1.DtlsParametersDto),
    __metadata("design:type", dtls_1.DtlsParametersDto)
], WebTransportOptionsDto.prototype, "dtlsParameters", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Array)
], WebTransportOptionsDto.prototype, "iceCandidates", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", ice_1.IceParametersDto)
], WebTransportOptionsDto.prototype, "iceParameters", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Array)
], WebTransportOptionsDto.prototype, "iceServers", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], WebTransportOptionsDto.prototype, "iceTransportPolicy", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], WebTransportOptionsDto.prototype, "id", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", sctp_1.SctpParametersDto)
], WebTransportOptionsDto.prototype, "sctpParameters", void 0);
