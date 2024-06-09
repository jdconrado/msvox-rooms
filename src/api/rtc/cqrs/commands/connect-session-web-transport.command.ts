import { RoomSessionTransportDirectionCd } from '@domain/enums';
import { DtlsParametersDto } from '@api/rtc/dtos';

export class ConnectSessionWebTransportCommand {
  constructor(
    public readonly sessionId: string,
    public readonly transportDirection: RoomSessionTransportDirectionCd,
    public readonly dtlsParameters: DtlsParametersDto,
  ) {}
}
