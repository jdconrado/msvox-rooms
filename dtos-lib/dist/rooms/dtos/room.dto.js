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
exports.RoomDto = void 0;
const entity_dto_1 = require("./entity.dto");
const classes_1 = require("@automapper/classes");
const room_participant_dto_1 = require("./room-participant.dto");
const class_transformer_1 = require("class-transformer");
const enums_1 = require("../../enums");
class RoomDto extends entity_dto_1.EntityDto {
}
exports.RoomDto = RoomDto;
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], RoomDto.prototype, "name", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], RoomDto.prototype, "routerId", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    __metadata("design:type", String)
], RoomDto.prototype, "status", void 0);
__decorate([
    (0, classes_1.AutoMap)(() => [room_participant_dto_1.RoomParticipantDto]),
    (0, class_transformer_1.Type)(() => room_participant_dto_1.RoomParticipantDto),
    __metadata("design:type", Array)
], RoomDto.prototype, "participants", void 0);
