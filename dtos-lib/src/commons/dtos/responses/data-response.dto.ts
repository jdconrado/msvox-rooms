import { AutoMap } from '@automapper/classes';

export class DataResponse<T> {
  @AutoMap()
  data: T;

  constructor(data?: T) {
    this.data = data;
  }
}
