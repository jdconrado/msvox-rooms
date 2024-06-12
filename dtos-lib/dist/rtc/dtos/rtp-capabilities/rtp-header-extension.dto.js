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
exports.RtpHeaderExtensionDto = void 0;
const classes_1 = require("@automapper/classes");
class RtpHeaderExtensionDto {
}
exports.RtpHeaderExtensionDto = RtpHeaderExtensionDto;
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], RtpHeaderExtensionDto.prototype, "uri", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], RtpHeaderExtensionDto.prototype, "direction", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], RtpHeaderExtensionDto.prototype, "kind", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Boolean)
], RtpHeaderExtensionDto.prototype, "preferredEncrypt", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", Number)
], RtpHeaderExtensionDto.prototype, "preferredId", void 0);
