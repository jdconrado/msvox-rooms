import { AutoMap } from '@automapper/classes';
import { IModel } from '@domain/primitives';

export class BaseModel implements IModel {
  @AutoMap()
  id: string;
  @AutoMap()
  createdAt: Date;
  @AutoMap()
  updatedAt: Date;
  @AutoMap()
  deletedAt?: Date;
}
