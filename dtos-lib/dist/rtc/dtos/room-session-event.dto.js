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
exports.RoomSessionEventDto = void 0;
const classes_1 = require("@automapper/classes");
const enums_1 = require("../../enums");
const swagger_1 = require("@nestjs/swagger");
const room_session_event_parameters_dto_1 = require("./room-session-event-parameters.dto");
class RoomSessionEventDto {
}
exports.RoomSessionEventDto = RoomSessionEventDto;
__decorate([
    (0, classes_1.AutoMap)(() => room_session_event_parameters_dto_1.RoomSessionEventParametersDto),
    (0, swagger_1.ApiProperty)({
        description: 'Event Parameters',
        type: room_session_event_parameters_dto_1.RoomSessionEventParametersDto,
    }),
    __metadata("design:type", room_session_event_parameters_dto_1.RoomSessionEventParametersDto)
], RoomSessionEventDto.prototype, "params", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, swagger_1.ApiProperty)({
        description: 'Event Type',
        enum: enums_1.RoomSessionEventsCd,
    }),
    __metadata("design:type", String)
], RoomSessionEventDto.prototype, "type", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, swagger_1.ApiProperty)({ description: 'Event Timestamp' }),
    __metadata("design:type", Number)
], RoomSessionEventDto.prototype, "timestamp", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, swagger_1.ApiProperty)({ description: 'Event Body' }),
    __metadata("design:type", Object)
], RoomSessionEventDto.prototype, "body", void 0);
