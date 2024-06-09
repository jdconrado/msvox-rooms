import {
  RoomSessionTransportActionsCd,
  RoomSessionTransportDirectionCd,
} from '@domain/enums';

export class ExecuteSessionTransportActionCommand {
  constructor(
    public readonly sessionId: string,
    public readonly transportDirection: RoomSessionTransportDirectionCd,
    public readonly action: RoomSessionTransportActionsCd,
  ) {}
}
