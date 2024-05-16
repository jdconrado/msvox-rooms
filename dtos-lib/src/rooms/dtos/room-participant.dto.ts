import { AutoMap } from '@automapper/classes';
import { IsISO8601 } from 'class-validator';

export class RoomParticipantDto {
  @AutoMap()
  id: string;

  @AutoMap()
  userId: string;

  @AutoMap()
  displayName?: string;

  @AutoMap()
  active: boolean;

  @AutoMap()
  @IsISO8601()
  createdAt: string;
}
