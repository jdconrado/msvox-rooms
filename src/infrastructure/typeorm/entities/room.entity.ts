import { AutoMap } from '@automapper/classes';
import { Column, Entity } from 'typeorm';
import { RoomParticipantEntity } from './participant.entity';
import { BaseEntity } from './base.entity';

@Entity()
export class RoomEntity extends BaseEntity {
  @AutoMap()
  @Column()
  name: string;

  @AutoMap(() => [RoomParticipantEntity])
  @Column(() => RoomParticipantEntity)
  participants: RoomParticipantEntity[];

  update(input?: object): void {
    if (!input) {
      return;
    }
    for (const key in input) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        this[key] = input[key];
      }
    }
  }
}
