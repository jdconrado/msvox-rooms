import { AutoMap } from '@automapper/classes';
import { SortDirectionEnum } from '@domain/enums';
import { ISorting } from '@domain/primitives';

export class Sorting implements ISorting {
  @AutoMap()
  orderField?: string;
  @AutoMap()
  orderDirection?: SortDirectionEnum;

  constructor(orderField?: string, orderDirection?: SortDirectionEnum) {
    this.orderField = orderField;
    this.orderDirection = orderDirection;
  }
}
