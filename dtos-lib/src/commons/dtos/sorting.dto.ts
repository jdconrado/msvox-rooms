import { AutoMap } from '@automapper/classes';

export class SortingDto {
  @AutoMap()
  orderField?: string;

  @AutoMap()
  orderDirection?: string;
}
