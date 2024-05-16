import { OffsetPaginationDto } from '../offset-pagination.dto';
import { SortingDto } from '../sorting.dto';
export declare class MetadataResponseDto<TFilter> {
    pagination?: OffsetPaginationDto;
    readonly sort?: SortingDto;
    readonly filter?: TFilter;
    readonly projection?: Array<string>;
    constructor(pagination?: OffsetPaginationDto, sort?: SortingDto, filter?: TFilter, projection?: Array<string>);
}
