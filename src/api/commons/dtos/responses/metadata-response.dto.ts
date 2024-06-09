import { OffsetPaginationDto } from '../offset-pagination.dto';
import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SortingDto } from '../sorting.dto';

export class MetadataResponseDto<TFilter> {
  @AutoMap(() => OffsetPaginationDto)
  @ApiProperty({
    description: 'Offset pagination info',
    type: OffsetPaginationDto,
    required: false,
  })
  public pagination?: OffsetPaginationDto;

  @AutoMap(() => SortingDto)
  @ApiProperty({
    description: 'Sorting info',
    type: SortingDto,
    required: false,
  })
  public readonly sort?: SortingDto;

  @AutoMap()
  @ApiProperty({ description: 'Filter info', required: false })
  public readonly filter?: TFilter;

  @AutoMap()
  @ApiPropertyOptional({
    description: 'Projection fields',
    example: ['id', 'firstName', 'lastName'],
    type: String,
    isArray: true,
  })
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
