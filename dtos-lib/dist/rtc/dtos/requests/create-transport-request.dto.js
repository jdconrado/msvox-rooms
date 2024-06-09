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
exports.CreateTransportRequestDto = void 0;
const classes_1 = require("@automapper/classes");
const swagger_1 = require("@nestjs/swagger");
const enums_1 = require("../../../enums");
const class_validator_1 = require("class-validator");
class CreateTransportRequestDto {
}
exports.CreateTransportRequestDto = CreateTransportRequestDto;
__decorate([
    (0, classes_1.AutoMap)(),
    (0, class_validator_1.IsEnum)(enums_1.RoomSessionTransportDirectionCd),
    (0, class_validator_1.IsDefined)(),
    (0, swagger_1.ApiProperty)({
        description: 'Transport direction',
        example: enums_1.RoomSessionTransportDirectionCd.SEND,
    }),
    __metadata("design:type", String)
], CreateTransportRequestDto.prototype, "direction", void 0);
