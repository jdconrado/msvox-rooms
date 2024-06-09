import { RoomSessionConsumerProducerActionsCd } from '@domain/enums';

export class ExecuteSessionConsumerActionCommand {
  constructor(
    public readonly sessionId: string,
    public readonly consumerId: string,
    public readonly action: RoomSessionConsumerProducerActionsCd,
  ) {}
}
