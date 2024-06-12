"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataMetadataResponseDto = void 0;
const data_response_dto_1 = require("./data-response.dto");
class DataMetadataResponseDto extends data_response_dto_1.DataResponse {
    constructor(data, metadata) {
        super(data);
        this.metadata = metadata;
    }
}
exports.DataMetadataResponseDto = DataMetadataResponseDto;
