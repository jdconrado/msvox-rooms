
import { AutoMap } from '@automapper/classes';
import { Type } from 'class-transformer';

export class OffsetPaginationDto {
  @AutoMap()
  @Type(() => Number)
  offset: number;

  @AutoMap()
  @Type(() => Number)
  limit: number;

  @AutoMap()
  @Type(() => Number)
  count?: number;
}
