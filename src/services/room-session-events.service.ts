import { Injectable, Logger } from '@nestjs/common';
import { IRoomSessionEventsService } from './primitives';
import {
  RoomParticipantStatusCd,
  RoomSessionConsumerProducerActionsCd,
  RoomSessionEventsCd,
  RoomSessionTransportActionsCd,
  RoomSessionTransportDirectionCd,
} from '@domain/enums';
import { RoomSessionService } from './room-session.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { RoomService } from './room.service';
import {
  RoomSessionEvent,
  RoomSessionEventParameters,
} from '@domain/models/events';

@Injectable()
export class RoomSessionEventsService implements IRoomSessionEventsService {
  private readonly logger = new Logger(RoomSessionEventsService.name);
  constructor(
    private roomService: RoomService,
    private readonly roomSessionService: RoomSessionService,
    private eventEmitter: EventEmitter2,
  ) {}

  async handleParticipantStatusChange(
    sessionId: string,
    participantId: string,
    status: RoomParticipantStatusCd,
  ): Promise<void> {
    this.logger.debug(
      `Handling session created event for session ${sessionId}`,
    );

    const session = this.roomSessionService.getById(sessionId);
    if (!session) {
      this.logger.error(`Session ${sessionId} not found`);
      return;
    }

    const room = await this.roomService.getById(session.roomId);
    if (!room) {
      this.logger.error(`Room ${session.roomId} not found`);
      return;
    }

    const participant = room.participants.find((p) => p.id === participantId);

    if (!participant) {
      this.logger.error(
        `Participant ${participant} not found in room ${room.id}`,
      );
      return;
    }

    participant.status = status;

    const eventParams = new RoomSessionEventParameters({
      sessionId,
      roomId: room.id,
      fromConnectionId: session.connectionId,
    });

    const event = new RoomSessionEvent({
      type: RoomSessionEventsCd.PARTICIPANT_STATUS_CHANGED,
      params: eventParams,
      timestamp: Date.now(),
      body: participant,
    });

    this.logger.debug(`Emitting event ${event.type} for session ${sessionId}`);
    this.eventEmitter.emit(event.type, event);
  }

  handleRoomClosed(sessionId: string): Promise<void> {
    this.logger.debug(`Handling room closed event for session ${sessionId}`);

    const session = this.roomSessionService.getById(sessionId);
    if (!session) {
      this.logger.error(`Session ${sessionId} not found`);
      return;
    }

    const eventParams = new RoomSessionEventParameters({
      sessionId,
      roomId: session.roomId,
    });

    const event = new RoomSessionEvent({
      type: RoomSessionEventsCd.ROOM_CLOSED,
      params: eventParams,
      timestamp: Date.now(),
      body: undefined,
    });

    this.logger.debug(`Emitting event ${event.type} for session ${sessionId}`);
    this.eventEmitter.emit(event.type, event);
  }

  handleProducerAction(
    sessionId: string,
    producerId: string,
    action: RoomSessionConsumerProducerActionsCd,
  ): Promise<void> {
    this.logger.debug(
      `Handling producer action event for session ${sessionId}`,
    );

    const session = this.roomSessionService.getById(sessionId);
    if (!session) {
      this.logger.error(`Session ${sessionId} not found`);
      return;
    }

    const eventParams = new RoomSessionEventParameters({
      sessionId,
      roomId: session.roomId,
      producerId,
      toConnectionId: session.connectionId,
    });

    const event = new RoomSessionEvent({
      type: RoomSessionEventsCd.PRODUCER_ACTION,
      params: eventParams,
      timestamp: Date.now(),
      body: {
        action,
      },
    });

    this.logger.debug(`Emitting event ${event.type} for session ${sessionId}`);
    this.eventEmitter.emit(event.type, event);
  }

  handleConsumerAction(
    sessionId: string,
    consumerId: string,
    action: RoomSessionConsumerProducerActionsCd,
  ): Promise<void> {
    this.logger.debug(
      `Handling consumer action event for session ${sessionId}`,
    );

    const session = this.roomSessionService.getById(sessionId);
    if (!session) {
      this.logger.error(`Session ${sessionId} not found`);
      return;
    }

    const eventParams = new RoomSessionEventParameters({
      sessionId,
      roomId: session.roomId,
      consumerId,
      toConnectionId: session.connectionId,
    });

    const event = new RoomSessionEvent({
      type: RoomSessionEventsCd.CONSUMER_ACTION,
      params: eventParams,
      timestamp: Date.now(),
      body: {
        action,
      },
    });

    this.logger.debug(`Emitting event ${event.type} for session ${sessionId}`);
    this.eventEmitter.emit(event.type, event);
  }

  handleTransportAction(
    sessionId: string,
    direction: RoomSessionTransportDirectionCd,
    action: RoomSessionTransportActionsCd,
  ): Promise<void> {
    this.logger.debug(
      `Handling transport action event for session ${sessionId}`,
    );

    const session = this.roomSessionService.getById(sessionId);
    if (!session) {
      this.logger.error(`Session ${sessionId} not found`);
      return;
    }

    const eventParams = new RoomSessionEventParameters({
      sessionId,
      roomId: session.roomId,
      toConnectionId: session.connectionId,
    });

    const event = new RoomSessionEvent({
      type: RoomSessionEventsCd.TRANSPORT_ACTION,
      params: eventParams,
      timestamp: Date.now(),
      body: {
        direction,
        action,
      },
    });

    this.logger.debug(`Emitting event ${event.type} for session ${sessionId}`);
    this.eventEmitter.emit(event.type, event);
  }
}
