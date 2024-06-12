import { OffsetPaginationDto } from '../offset-pagination.dto';
import { AutoMap } from '@automapper/classes';

import { SortingDto } from '../sorting.dto';

export class MetadataResponseDto<TFilter> {
  @AutoMap(() => OffsetPaginationDto)
  public pagination?: OffsetPaginationDto;

  @AutoMap(() => SortingDto)
  public readonly sort?: SortingDto;

  @AutoMap()
  public readonly filter?: TFilter;

  @AutoMap()
  public readonly projection?: Array<string>;

  constructor(
    pagination?: OffsetPaginationDto,
    sort?: SortingDto,
    filter?: TFilter,
    projection?: Array<string>,
  ) {
    this.pagination = pagination;
    this.sort = sort;
    this.filter = filter;
    this.projection = projection;
  }
}
