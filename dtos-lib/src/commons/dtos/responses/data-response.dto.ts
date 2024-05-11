import { AutoMap } from '@automapper/classes';

export class DataResponse<T> {
  @AutoMap()
  data: T | T[] | unknown;

  constructor(data?: T | T[]) {
    this.data = data;
  }
}
