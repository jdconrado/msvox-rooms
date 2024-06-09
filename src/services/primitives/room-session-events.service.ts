import {
  RoomParticipantStatusCd,
  RoomSessionConsumerProducerActionsCd,
  RoomSessionTransportActionsCd,
  RoomSessionTransportDirectionCd,
} from '@domain/enums';

export interface IRoomSessionEventsService {
  handleParticipantStatusChange(
    sessionId: string,
    participantId: string,
    status: RoomParticipantStatusCd,
  ): Promise<void>;
  handleRoomClosed(sessionId: string): Promise<void>;
  handleProducerAction(
    sessionId: string,
    producerId: string,
    action: RoomSessionConsumerProducerActionsCd,
  ): Promise<void>;
  handleConsumerAction(
    sessionId: string,
    consumerId: string,
    action: RoomSessionConsumerProducerActionsCd,
  ): Promise<void>;
  handleTransportAction(
    sessionId: string,
    direction: RoomSessionTransportDirectionCd,
    action: RoomSessionTransportActionsCd,
  ): Promise<void>;
}
