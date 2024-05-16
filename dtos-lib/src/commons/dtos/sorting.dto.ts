import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class SortingDto {
  @AutoMap()
  @ApiProperty({ description: 'Order field name', required: false })
  orderField?: string;

  @AutoMap()
  @ApiProperty({ description: 'Order direction', required: false })
  orderDirection?: string;
}
