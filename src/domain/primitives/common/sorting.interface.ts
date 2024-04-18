import { SortDirectionEnum } from '../../enums/common/sorting-direction.enum';

export interface ISorting {
  orderField?: string;
  orderDirection?: SortDirectionEnum;
}
