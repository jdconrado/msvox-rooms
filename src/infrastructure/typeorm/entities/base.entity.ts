import { AutoMap } from '@automapper/classes';
import {
  Column,
  CreateDateColumn,
  ObjectId,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity {
  @AutoMap()
  @ObjectIdColumn()
  _id: ObjectId;

  @AutoMap()
  @CreateDateColumn()
  createdAt: Date;

  @AutoMap()
  @UpdateDateColumn()
  updatedAt: Date;

  @AutoMap()
  @Column({ nullable: true })
  deletedAt?: Date;

  public update(input?: object) {
    console.log('update', input);
    throw new Error('Method not implemented.');
  }
}
