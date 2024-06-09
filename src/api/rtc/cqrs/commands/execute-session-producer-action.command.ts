import { RoomSessionConsumerProducerActionsCd } from '@domain/enums';

export class ExecuteSessionProducerActionCommand {
  constructor(
    public readonly sessionId: string,
    public readonly producerId: string,
    public readonly action: RoomSessionConsumerProducerActionsCd,
  ) {}
}
