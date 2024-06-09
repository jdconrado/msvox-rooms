import { AutoMap } from '@automapper/classes';
import { RoomParticipantStatusCd } from '../../enums';
import { IsISO8601 } from 'class-validator';

export class RoomParticipantDto {
  @AutoMap()
  id: string;

  @AutoMap()
  userId: string;

  @AutoMap()
  displayName?: string;

  @AutoMap()
  status: RoomParticipantStatusCd;

  @AutoMap()
  @IsISO8601()
  createdAt: string;
}
