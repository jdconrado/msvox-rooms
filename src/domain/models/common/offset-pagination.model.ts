import { IOffsetPagination } from '../../primitives/common/offset-pagination.interface';
import { AutoMap } from '@automapper/classes';

export class OffsetPagination implements IOffsetPagination {
  @AutoMap()
  offset: number;
  @AutoMap()
  limit: number;
  @AutoMap()
  count: number;
  constructor(offset?: number, limit?: number) {
    this.offset = offset || 0;
    this.limit = limit || 50;
    this.count = 0;
  }
}
