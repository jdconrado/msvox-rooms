import { OffsetPaginationResponseDto } from './offset-pagination-response.dto';
import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SortingResponseDto } from './sorting-response.dto';

export class MetadataResponseDto<TFilter> {
  @AutoMap(() => OffsetPaginationResponseDto)
  @ApiProperty({
    description: 'Offset pagination info',
    type: OffsetPaginationResponseDto,
    required: false,
  })
  public pagination?: OffsetPaginationResponseDto;

  @AutoMap(() => SortingResponseDto)
  @ApiProperty({
    description: 'Sorting info',
    type: SortingResponseDto,
    required: false,
  })
  public readonly sort?: SortingResponseDto;

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
    pagination?: OffsetPaginationResponseDto,
    sort?: SortingResponseDto,
    filter?: TFilter,
    projection?: Array<string>,
  ) {
    this.pagination = pagination;
    this.sort = sort;
    this.filter = filter;
    this.projection = projection;
  }
}
