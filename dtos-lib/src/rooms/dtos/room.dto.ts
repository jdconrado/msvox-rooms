import { EntityDto } from './entity.dto';
import { AutoMap } from '@automapper/classes';
import { RoomParticipantDto } from './room-participant.dto';
import { Type } from 'class-transformer';
import { RoomStatusCd } from '../../enums';

export class RoomDto extends EntityDto {
  @AutoMap()
  name: string;

  @AutoMap()
  routerId?: string;

  @AutoMap()
  status: RoomStatusCd;

  @AutoMap(() => [RoomParticipantDto])
  @Type(() => RoomParticipantDto)
  participants: RoomParticipantDto[];
}
