import { eventNamespaces } from '@api/commons/event-namespaces';
import { Logger } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
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
  JoinRoomSessionCommand,
  LeaveRoomSessionCommand,
} from '@api/rtc/cqrs/commands';
import {
  RoomSessionConsumerProducerActionsCd,
  RoomSessionEventsCd,
  RoomSessionParticipantEventsCd,
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
  private readonly sessionAssignedClients = new Map<string, string>();
  private readonly clientConnectData = new Map<
    string,
    ConnectRoomSessionRequestDto
  >();

  @WebSocketServer()
  server: Server;

  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    @InjectMapper() private readonly mapper: Mapper,
  ) {
    setInterval(() => {
      this.logger.debug('clients: {clients}', { clients: this.clients.size });
    }, 30000);
  }

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

    this.clientConnectData.set(client.id, handshakeAuth);
    this.clients.set(client.id, client);
  }

  async handleDisconnect(client: Socket) {
    this.logger.debug('handleDisconnect: {clientId}', { clientId: client.id });
    const clientData = this.clientConnectData.get(client.id);
    if (!clientData) {
      this.logger.error('Client data not found for handleDisconnect');
      return;
    }
    const command = new LeaveRoomSessionCommand(clientData.userId);
    try {
      await this.commandBus.execute(command);
    } catch (error) {
      this.logger.error(
        'leaveRoom error on disconnect error: {error, clientData}',
        { error, clientData },
      );
    }
    this.clients.delete(client.id);
    this.clientConnectData.delete(client.id);
  }

  @SubscribeMessage(RoomSessionParticipantEventsCd.JOIN)
  async handleParticipantJoin(
    @MessageBody() event: RoomSessionEventDto,
    @ConnectedSocket() client: Socket,
  ) {
    this.logger.debug('handleParticipantJoin: {event}', { event });

    const clientData = this.clientConnectData.get(client.id);
    if (!clientData) {
      this.logger.error('Client data not found for event {event}', { event });
      return;
    }

    const command = new JoinRoomSessionCommand(
      event.params.sessionId,
      clientData.userId,
    );

    const roomId = await this.commandBus.execute<
      JoinRoomSessionCommand,
      string
    >(command);
    this.sessionAssignedClients.set(event.params.sessionId, client.id);
    client.join(event.params.sessionId);
    client.join(roomId);

    return true;
  }

  @SubscribeMessage(RoomSessionParticipantEventsCd.LEAVE)
  async handleParticipantLeave(
    @MessageBody() event: RoomSessionEventDto,
    @ConnectedSocket() client: Socket,
  ) {
    this.logger.debug('handleParticipantLeave: {event}', { event });

    const clientData = this.clientConnectData.get(client.id);
    if (!clientData) {
      this.logger.error('Client data not found for event {event}', { event });
      return;
    }

    const command = new LeaveRoomSessionCommand(
      clientData.userId,
      event.params.sessionId,
    );

    await this.commandBus.execute<LeaveRoomSessionCommand>(command);

    this.sessionAssignedClients.delete(event.params.sessionId);
    client.leave(event.params.sessionId);
    client.leave(event.params.roomId);

    return true;
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
      event.params.toSessionId ?? event.params.roomId,
      event.params.from ? event.params.sessionId : undefined,
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
      event.params.toSessionId ?? event.params.roomId,
      event.params.from ? event.params.sessionId : undefined,
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
      event.params.toSessionId ?? event.params.roomId,
      event.params.from ? event.params.sessionId : undefined,
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
      event.params.toSessionId ?? event.params.roomId,
      event.params.from ? event.params.sessionId : undefined,
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
      event.params.toSessionId ?? event.params.roomId,
      event.params.from ? event.params.sessionId : undefined,
    );
  }

  emitEvent<T>(
    name: string,
    data: T,
    to?: string,
    from?: string,
    cb?: (error: object | null, response: object | null) => Promise<void>,
  ): Promise<void> {
    this.logger.debug('emitEvent: {name, room, connectionId}', {
      name,
      room: to,
      connectionId: from,
    });
    if (from) {
      const clientId = this.sessionAssignedClients.get(from);
      const socket = this.clients.get(clientId)?.to(to);
      if (!socket) {
        this.logger.error('Socket not found for event {name, connectionId}', {
          name,
          from,
        });
        return; // TODO: Review if it should throw an error
      }
      socket.emit(name, data, cb);
    } else {
      this.server.to(to).emit(name, data, cb);
    }
  }
}
