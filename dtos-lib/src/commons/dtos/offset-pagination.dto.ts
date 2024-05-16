import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';

export class OffsetPaginationDto {
  @AutoMap()
  @ApiProperty({ description: 'Pagination offset' })
  offset: number;

  @AutoMap()
  @ApiProperty({ description: 'Pagination limit' })
  limit: number;

  @AutoMap()
  @ApiPropertyOptional({ description: 'Total records' })
  count?: number;
}
