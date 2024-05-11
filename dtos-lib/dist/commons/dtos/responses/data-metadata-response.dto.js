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
exports.DataMetadataResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const data_response_dto_1 = require("./data-response.dto");
const metadata_response_dto_1 = require("./metadata-response.dto");
class DataMetadataResponseDto extends data_response_dto_1.DataResponse {
    constructor(data, metadata) {
        super(data);
        this.metadata = metadata;
    }
}
exports.DataMetadataResponseDto = DataMetadataResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Metadata info' }),
    __metadata("design:type", metadata_response_dto_1.MetadataResponseDto)
], DataMetadataResponseDto.prototype, "metadata", void 0);
