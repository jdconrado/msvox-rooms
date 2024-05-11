import { SortDirectionEnum } from '@domain/enums/common/sorting-direction.enum';

export interface ISorting {
  orderField?: string;
  orderDirection?: SortDirectionEnum;
}
