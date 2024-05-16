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
exports.MetadataResponseDto = void 0;
const offset_pagination_dto_1 = require("../offset-pagination.dto");
const classes_1 = require("@automapper/classes");
const swagger_1 = require("@nestjs/swagger");
const sorting_dto_1 = require("../sorting.dto");
class MetadataResponseDto {
    constructor(pagination, sort, filter, projection) {
        this.pagination = pagination;
        this.sort = sort;
        this.filter = filter;
        this.projection = projection;
    }
}
exports.MetadataResponseDto = MetadataResponseDto;
__decorate([
    (0, classes_1.AutoMap)(() => offset_pagination_dto_1.OffsetPaginationDto),
    (0, swagger_1.ApiProperty)({
        description: 'Offset pagination info',
        type: offset_pagination_dto_1.OffsetPaginationDto,
        required: false,
    }),
    __metadata("design:type", offset_pagination_dto_1.OffsetPaginationDto)
], MetadataResponseDto.prototype, "pagination", void 0);
__decorate([
    (0, classes_1.AutoMap)(() => sorting_dto_1.SortingDto),
    (0, swagger_1.ApiProperty)({
        description: 'Sorting info',
        type: sorting_dto_1.SortingDto,
        required: false,
    }),
    __metadata("design:type", sorting_dto_1.SortingDto)
], MetadataResponseDto.prototype, "sort", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, swagger_1.ApiProperty)({ description: 'Filter info', required: false }),
    __metadata("design:type", Object)
], MetadataResponseDto.prototype, "filter", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Projection fields',
        example: ['id', 'firstName', 'lastName'],
        type: String,
        isArray: true,
    }),
    __metadata("design:type", Array)
], MetadataResponseDto.prototype, "projection", void 0);
