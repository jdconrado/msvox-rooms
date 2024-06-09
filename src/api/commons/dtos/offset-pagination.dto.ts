import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
import { Type } from 'class-transformer';

export class OffsetPaginationDto {
  @AutoMap()
  @Type(() => Number)
  @ApiProperty({ description: 'Pagination offset' })
  offset: number;

  @AutoMap()
  @Type(() => Number)
  @ApiProperty({ description: 'Pagination limit' })
  limit: number;

  @AutoMap()
  @Type(() => Number)
  @ApiPropertyOptional({ description: 'Total records' })
  count?: number;
}
