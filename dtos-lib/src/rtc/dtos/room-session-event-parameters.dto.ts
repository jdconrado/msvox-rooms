import { AutoMap } from '@automapper/classes';

export class RoomSessionEventParametersDto {
  @AutoMap()
  roomId: string;

  @AutoMap()
  sessionId: string;

  @AutoMap()
  participantId?: string;

  @AutoMap()
  producerId?: string;

  @AutoMap()
  consumerId?: string;
}
