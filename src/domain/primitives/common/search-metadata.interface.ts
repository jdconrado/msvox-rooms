import { ISorting } from './sorting.interface';
import { IOffsetPagination } from './offset-pagination.interface';

export interface ISearchMetadata {
  pagination?: IOffsetPagination;
  sorting?: ISorting;
}
