/*
  This file is used to define the RoomSessionServiceInterface interface.
  A RoomSessionService is used to create and manage RoomSession instances and the events associated with them.
 */
import { RoomSession } from '@domain/models/room-session.model';

export interface IRoomSessionService {
  createSession(
    roomId: string,
    participantId: string,
    routerId: string,
  ): string;
  getSession(roomId: string, participantId: string): RoomSession | null;
  getByConnectionId(connectionId: string): RoomSession | null;
  getById(id: string): RoomSession | null;
  removeSession(id: string): void;
  setProducerTransportId(id: string, transportId: string): void;
  setConsumerTransportId(id: string, transportId: string): void;
  addProducer(id: string, producerId: string): Promise<void>;
  removeProducer(id: string, producerId: string): Promise<void>;
  addConsumer(id: string, consumerId: string): Promise<void>;
  removeConsumer(id: string, consumerId: string): Promise<void>;
  getProducerIds(id: string): string[] | null;
  getConsumerIds(id: string): string[] | null;
}
