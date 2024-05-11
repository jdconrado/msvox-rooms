import { AutoMap } from '@automapper/classes';
import { IsISO8601 } from 'class-validator';

export class RoomParticipantDto {
  @AutoMap()
  id: string;

  @AutoMap()
  userId: string;

  @AutoMap()
  sendTransportId?: string;

  @AutoMap()
  recvTransportId?: string;

  @AutoMap()
  @IsISO8601()
  createdAt: string;
}
