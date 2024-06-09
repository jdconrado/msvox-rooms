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
exports.IceCandidateDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const classes_1 = require("@automapper/classes");
class IceCandidateDto {
}
exports.IceCandidateDto = IceCandidateDto;
__decorate([
    (0, classes_1.AutoMap)(),
    (0, swagger_1.ApiProperty)({ example: 'candidate:0 1 UDP 21222525' }),
    __metadata("design:type", String)
], IceCandidateDto.prototype, "foundation", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, swagger_1.ApiProperty)({ example: '192.0.0.1' }),
    __metadata("design:type", String)
], IceCandidateDto.prototype, "ip", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, swagger_1.ApiProperty)({ example: 10000 }),
    __metadata("design:type", Number)
], IceCandidateDto.prototype, "port", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], IceCandidateDto.prototype, "priority", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, swagger_1.ApiProperty)({ example: 'udp' }),
    __metadata("design:type", String)
], IceCandidateDto.prototype, "protocol", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, swagger_1.ApiProperty)({ example: 'pasive' }),
    __metadata("design:type", String)
], IceCandidateDto.prototype, "tcpType", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, swagger_1.ApiProperty)({ example: 'host' }),
    __metadata("design:type", String)
], IceCandidateDto.prototype, "type", void 0);
