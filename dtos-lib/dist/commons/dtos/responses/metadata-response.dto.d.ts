import { OffsetPaginationResponseDto } from './offset-pagination-response.dto';
import { SortingResponseDto } from './sorting-response.dto';
export declare class MetadataResponseDto<TFilter> {
    pagination?: OffsetPaginationResponseDto;
    readonly sort?: SortingResponseDto;
    readonly filter?: TFilter;
    readonly projection?: Array<string>;
    constructor(pagination?: OffsetPaginationResponseDto, sort?: SortingResponseDto, filter?: TFilter, projection?: Array<string>);
}
