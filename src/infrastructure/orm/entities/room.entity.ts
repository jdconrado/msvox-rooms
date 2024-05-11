import { AutoMap } from '@automapper/classes';
import { Column, Entity } from 'typeorm';
import { RoomParticipantEntity } from './participant.entity';
import { BaseEntity } from './base.entity';
import { RoomStatusCd } from '@domain/enums';

@Entity()
export class RoomEntity extends BaseEntity {
  @AutoMap()
  @Column()
  name: string;

  @AutoMap()
  @Column({ nullable: true })
  routerId?: string;

  @AutoMap()
  @Column({ type: 'enum', enum: RoomStatusCd, default: RoomStatusCd.STARTING })
  status: RoomStatusCd;

  @AutoMap(() => [RoomParticipantEntity])
  @Column(() => RoomParticipantEntity)
  participants: RoomParticipantEntity[];

  update(input?: object): void {
    if (!input) {
      return;
    }
    const optionalKeys = ['routerId'];
    for (const key in input) {
      if (
        Object.prototype.hasOwnProperty.call(this, key) ||
        optionalKeys.includes(key)
      ) {
        this[key] = input[key];
      }
    }
  }
}
