import { AutoMap } from '@automapper/classes';
import { Column } from 'typeorm';

export class RoomParticipantEntity {
  @AutoMap()
  @Column({ type: 'uuid' })
  id: string;

  @AutoMap()
  @Column()
  userId: string;

  @AutoMap()
  @Column()
  createdAt: Date;
}
