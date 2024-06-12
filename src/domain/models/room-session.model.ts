import { IRoomSession } from '@domain/primitives/room-session.interface';
import { v4 as uuidV4 } from 'uuid';

export class RoomSession implements IRoomSession {
  id: string;
  roomId: string;
  participantId: string;
  userId: string;
  routerId: string;
  consumerTransportId: string | null;
  producerTransportId: string | null;
  producerIds: string[];
  consumerIds: string[];

  constructor(
    roomId: string,
    participantId: string,
    userId: string,
    routerId: string,
    id: string = uuidV4(),
    producerIds: string[] = [],
    consumerIds: string[] = [],
  ) {
    this.id = id;
    this.roomId = roomId;
    this.routerId = routerId;
    this.participantId = participantId;
    this.userId = userId;
    this.producerIds = producerIds;
    this.consumerIds = consumerIds;
  }
}
