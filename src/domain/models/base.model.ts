import { AutoMap } from '@automapper/classes';
import { IModel } from '../primitives/base-model.interface';

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
