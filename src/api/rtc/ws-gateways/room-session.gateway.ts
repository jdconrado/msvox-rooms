import { eventNamespaces } from '@api/commons/event-namespaces';
import { Logger } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import {
  ConnectRoomSessionRequestDto,
  RoomSessionEventDto,
} from '@api/rtc/dtos';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import {
  ConnectRoomSessionCommand,
  DisconnectRoomSessionCommand,
} from '@api/rtc/cqrs/commands';
import {
  RoomSessionConsumerProducerActionsCd,
  RoomSessionEventsCd,
  RoomSessionTransportDirectionCd,
} from '@domain/enums';
import { OnEvent } from '@nestjs/event-emitter';
import { RoomSessionEvent } from '@domain/models/events';
import { IRoomParticipant } from '@domain/primitives';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';

@WebSocketGateway({ namespace: eventNamespaces.roomSession.system })
export class RoomSessionGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  private logger = new Logger(RoomSessionGateway.name);
  private readonly clients = new Map<string, Socket>();

  @WebSocketServer()
  server: Server;

  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async handleConnection(client: Socket, ...args: any[]) {
    const handshakeAuth: ConnectRoomSessionRequestDto = plainToClass(
      ConnectRoomSessionRequestDto,
      client.handshake.auth,
    );
    this.logger.debug('handleConnection: {handshakeAuth}', { handshakeAuth });
    const validationErrors = await validate(handshakeAuth);
    if (validationErrors.length > 0) {
      this.logger.error('validationErrors', { validationErrors });
      client.disconnect();
      return;
    }

    const command = new ConnectRoomSessionCommand(
      handshakeAuth.sessionId,
      handshakeAuth.userId,
      client.id,
    );

    try {
      const roomId = await this.commandBus.execute<
        ConnectRoomSessionCommand,
        string
      >(command);
      this.clients.set(client.id, client);
      client.join(handshakeAuth.sessionId); // TODO: Remove connectionId using this
      client.join(roomId);
    } catch (error) {
      this.logger.error('connectRoomSession error: {error}', { error });
      client.disconnect();
    }
  }

  async handleDisconnect(client: Socket) {
    this.logger.debug('handleDisconnect: {clientId}', { clientId: client.id });
    const command = new DisconnectRoomSessionCommand(client.id);
    try {
      await this.commandBus.execute(command);
      this.clients.delete(client.id);
    } catch (error) {
      this.logger.error('disconnectRoomSession error: {error}', { error });
    }
  }

  @OnEvent(RoomSessionEventsCd.PARTICIPANT_STATUS_CHANGED)
  handleParticipantStatusChanged(event: RoomSessionEvent<IRoomParticipant>) {
    this.logger.debug('handleParticipantStatusChanged: {event}', { event });

    const eventDto = this.mapper.map(
      event,
      RoomSessionEvent,
      RoomSessionEventDto,
    );

    this.emitEvent(
      RoomSessionEventsCd.PARTICIPANT_STATUS_CHANGED,
      eventDto,
      event.params.toConnectionId ?? event.params.roomId,
      event.params.fromConnectionId,
    );
  }

  @OnEvent(RoomSessionEventsCd.ROOM_CLOSED)
  handleRoomClosed(event: RoomSessionEvent) {
    const eventDto = this.mapper.map(
      event,
      RoomSessionEvent,
      RoomSessionEventDto,
    );

    this.emitEvent(
      RoomSessionEventsCd.ROOM_CLOSED,
      eventDto,
      event.params.toConnectionId ?? event.params.roomId,
      event.params.fromConnectionId,
    );
  }

  @OnEvent(RoomSessionEventsCd.CONSUMER_ACTION)
  handleConsumerAction(
    event: RoomSessionEvent<{ action: RoomSessionConsumerProducerActionsCd }>,
  ) {
    const eventDto = this.mapper.map(
      event,
      RoomSessionEvent,
      RoomSessionEventDto,
    );

    this.emitEvent(
      RoomSessionEventsCd.CONSUMER_ACTION,
      eventDto,
      event.params.toConnectionId ?? event.params.roomId,
      event.params.fromConnectionId,
    );
  }

  @OnEvent(RoomSessionEventsCd.PRODUCER_ACTION)
  handleProducerAction(
    event: RoomSessionEvent<{ action: RoomSessionConsumerProducerActionsCd }>,
  ) {
    const eventDto = this.mapper.map(
      event,
      RoomSessionEvent,
      RoomSessionEventDto,
    );

    this.emitEvent(
      RoomSessionEventsCd.PRODUCER_ACTION,
      eventDto,
      event.params.toConnectionId ?? event.params.roomId,
      event.params.fromConnectionId,
    );
  }

  @OnEvent(RoomSessionEventsCd.TRANSPORT_ACTION)
  handleTransportAction(
    event: RoomSessionEvent<{
      action: RoomSessionTransportDirectionCd;
      direction: RoomSessionTransportDirectionCd;
    }>,
  ) {
    const eventDto = this.mapper.map(
      event,
      RoomSessionEvent,
      RoomSessionEventDto,
    );

    this.emitEvent(
      RoomSessionEventsCd.TRANSPORT_ACTION,
      eventDto,
      event.params.toConnectionId ?? event.params.roomId,
      event.params.fromConnectionId,
    );
  }

  emitEvent<T>(
    name: string,
    data: T,
    to?: string,
    connectionId?: string,
    cb?: (error: object | null, response: object | null) => Promise<void>,
  ): Promise<void> {
    this.logger.debug('emitEvent: {name, room, connectionId}', {
      name,
      room: to,
      connectionId,
    });
    if (connectionId) {
      const socket = this.clients.get(connectionId)?.to(to);
      if (!socket) {
        this.logger.error('Socket not found for event {name, connectionId}', {
          name,
          connectionId,
        });
        return; // TODO: Review if it should throw an error
      }
      socket.emit(name, data, cb);
    } else {
      this.server.to(to).emit(name, data, cb);
    }
  }
}
