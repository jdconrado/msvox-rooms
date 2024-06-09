import { Injectable, Logger } from '@nestjs/common';
import { IRoomSessionService } from '@services/primitives/room-session.service.interface';
import { RoomSession } from '@domain/models/room-session.model';

@Injectable()
export class RoomSessionService implements IRoomSessionService {
  private logger = new Logger(RoomSessionService.name);
  private sessionsByRoomId: Map<string, Array<RoomSession>> = new Map();
  private sessionsById: Map<string, RoomSession> = new Map();

  async addConsumer(id: string, consumerId: string): Promise<void> {
    this.logger.debug(`Adding consumer ${consumerId} to session ${id}`);
    const session = this.sessionsById.get(id);
    if (!session) {
      throw new Error(`Session ${id} not found`);
    }
    session.consumerIds.push(consumerId);
  }

  async addProducer(id: string, producerId: string): Promise<void> {
    this.logger.debug(`Adding producer ${producerId} to session ${id}`);
    const session = this.sessionsById.get(id);
    if (!session) {
      throw new Error(`Session ${id} not found`);
    }
    session.producerIds.push(producerId);
  }

  createSession(
    roomId: string,
    participantId: string,
    routerId: string,
  ): string {
    this.logger.debug(
      `Creating session for room ${roomId} and participant ${participantId}`,
    );

    const session = new RoomSession(roomId, participantId, routerId);
    if (!this.sessionsByRoomId.has(roomId)) {
      this.sessionsByRoomId.set(roomId, []);
    }
    this.sessionsByRoomId.get(roomId)?.push(session);
    this.sessionsById.set(session.id, session);

    this.logger.debug(`Session created with id ${session.id}`);

    return session.id;
  }

  removeSession(id: string): void {
    this.logger.debug(`Removing session ${id}`);
    const session = this.sessionsById.get(id);
    if (!session) {
      throw new Error(`Session ${id} not found`);
    }
    this.sessionsById.delete(id);
    const sessions = this.sessionsByRoomId.get(session.roomId);
    if (!sessions) {
      throw new Error(`Sessions for room ${session.roomId} not found`);
    }
    this.sessionsByRoomId.set(
      session.roomId,
      sessions.filter((s) => s.id !== id),
    );
  }

  getConsumerIds(id: string): string[] | null {
    return this.sessionsById.get(id)?.consumerIds || null;
  }

  getProducerIds(id: string): string[] | null {
    return this.sessionsById.get(id)?.producerIds || null;
  }

  getSession(roomId: string, participantId: string): RoomSession | null {
    const sessions = this.sessionsByRoomId.get(roomId);
    if (!sessions) {
      return null;
    }

    const session = sessions.find((s) => s.participantId === participantId);

    return session ?? null;
  }

  getByConnectionId(connectionId: string): RoomSession | null {
    const session = Array.from(this.sessionsById.values()).find(
      (s) => s.connectionId === connectionId,
    );

    return session ?? null;
  }

  async removeConsumer(id: string, consumerId: string): Promise<void> {
    this.logger.debug(`Removing consumer ${consumerId} from session ${id}`);
    const session = this.sessionsById.get(id);
    if (!session) {
      throw new Error(`Session ${id} not found`);
    }
    session.consumerIds = session.consumerIds.filter((id) => id !== consumerId);
  }

  async removeProducer(id: string, producerId: string): Promise<void> {
    this.logger.debug(`Removing producer ${producerId} from session ${id}`);
    const session = this.sessionsById.get(id);
    if (!session) {
      throw new Error(`Session ${id} not found`);
    }
    session.producerIds = session.producerIds.filter((id) => id !== producerId);
  }

  setConsumerTransportId(id: string, transportId: string): void {
    this.logger.debug(
      `Setting consumer transport id ${transportId} for session ${id}`,
    );
    const session = this.sessionsById.get(id);
    if (!session) {
      throw new Error(`Session ${id} not found`);
    }
    session.consumerTransportId = transportId;
  }

  setProducerTransportId(id: string, transportId: string): void {
    this.logger.debug(
      `Setting producer transport id ${transportId} for session ${id}`,
    );
    const session = this.sessionsById.get(id);
    if (!session) {
      throw new Error(`Session ${id} not found`);
    }
    session.producerTransportId = transportId;
  }

  setConnectionId(id: string, connectionId: string): void {
    this.logger.debug(
      `Setting consumer connection id ${connectionId} for session ${id}`,
    );
    const session = this.sessionsById.get(id);
    if (!session) {
      throw new Error(`Session ${id} not found`);
    }
    session.connectionId = connectionId;
  }

  getById(id: string): RoomSession | null {
    return this.sessionsById.get(id) || null;
  }
}
