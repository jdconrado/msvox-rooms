import { RoomSessionTransportDirectionCd } from '@domain/enums';

export class CreateWebTransportCommand {
  constructor(
    public readonly sessionId: string,
    public readonly direction: RoomSessionTransportDirectionCd,
  ) {}
}
