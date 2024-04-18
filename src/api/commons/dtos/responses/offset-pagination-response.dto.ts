import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';

export class OffsetPaginationResponseDto {
  @AutoMap()
  @ApiProperty({ description: 'Pagination offset' })
  offset: number;

  @AutoMap()
  @ApiProperty({ description: 'Pagination limit' })
  limit: number;

  @AutoMap()
  @ApiProperty({ description: 'Total records' })
  count: number;
}
