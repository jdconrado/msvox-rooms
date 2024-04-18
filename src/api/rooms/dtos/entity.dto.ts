import { AutoMap } from '@automapper/classes';
import { IsISO8601 } from 'class-validator';

export class EntityDto {
  @AutoMap()
  id: string;

  @AutoMap()
  @IsISO8601()
  createdAt: string;

  @AutoMap()
  @IsISO8601()
  updatedAt: string;

  @AutoMap()
  @IsISO8601()
  deletedAt?: string;
}
