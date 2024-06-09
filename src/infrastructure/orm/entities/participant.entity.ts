import { AutoMap } from '@automapper/classes';
import { RoomParticipantStatusCd } from '@domain/enums';
import { Column } from 'typeorm';

export class RoomParticipantEntity {
  @AutoMap()
  @Column({ type: 'uuid' })
  id: string;

  @AutoMap()
  @Column()
  userId: string;

  @AutoMap()
  @Column({ nullable: true })
  displayName?: string;

  @AutoMap()
  @Column({ default: RoomParticipantStatusCd.INACTIVE })
  status: RoomParticipantStatusCd;

  @AutoMap()
  @Column()
  createdAt: Date;
}
