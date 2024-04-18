import { EntityDto } from './entity.dto';
import { AutoMap } from '@automapper/classes';
import { RoomParticipantDto } from './roomParticipantDto';
import { Type } from 'class-transformer';

export class RoomDto extends EntityDto {
  @AutoMap()
  name: string;

  @AutoMap(() => [RoomParticipantDto])
  @Type(() => RoomParticipantDto)
  participants: RoomParticipantDto[];
}
