import { AutoMap } from '@automapper/classes';
import { SortDirectionEnum } from '../../enums/common/sorting-direction.enum';
import { ISorting } from '../../primitives/common/sorting.interface';

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
