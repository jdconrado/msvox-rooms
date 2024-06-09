import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { routePaths } from '@api/commons/route-paths';
import { DataResponse } from '@api/commons/dtos';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ConnectSessionWebTransportRequestDto,
  CreateSessionProducerRequestDto,
  CreateTransportRequestDto,
  RoomRequestParamsDto,
  RtpCapabilitiesDto,
  CreateRoomSessionRequestDto,
  RoomSessionRequestParamsDto,
  CreateSessionConsumerRequestDto,
  RoomSessionProducerRequestParamsDto,
  ExecuteSessionConsumerProducerActionRequestDto,
  RoomSessionConsumerRequestParamsDto,
  ExecuteSessionTransportActionRequestDto,
} from '@api/rtc/dtos';
import { GetRoomSessionRtpCapabilitiesQuery } from '@api/rtc/cqrs/queries';
import { WebTransportOptionsDto } from '@api/rtc/dtos/transport-options';
import {
  ConnectSessionWebTransportCommand,
  CreateRoomSessionCommand,
  CreateSessionConsumerCommand,
  CreateSessionProducerCommand,
  CreateWebTransportCommand,
  ExecuteSessionConsumerActionCommand,
  ExecuteSessionProducerActionCommand,
  ExecuteSessionTransportActionCommand,
} from '@api/rtc/cqrs/commands';
import { ConsumerResponseDto } from '@api/rtc/dtos/responses';

@Controller({ path: routePaths.roomSession.system })
export class RoomSessionController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createSession(
    @Param() params: RoomRequestParamsDto,
    @Body() body: CreateRoomSessionRequestDto,
  ): Promise<DataResponse<string>> {
    if (!params.roomId) {
      throw new BadRequestException('Room id is required');
    }
    const command = new CreateRoomSessionCommand(
      params.roomId,
      body.participantId,
      true,
    );

    const result = await this.commandBus.execute<
      CreateRoomSessionCommand,
      string
    >(command);

    return new DataResponse(result);
  }

  @Get('/:sessionId/rtp-capabilities')
  @HttpCode(HttpStatus.OK)
  async getSessionsRtpCapabilities(
    @Param() params: RoomSessionRequestParamsDto,
  ): Promise<DataResponse<RtpCapabilitiesDto>> {
    if (!params.sessionId) {
      throw new BadRequestException('SessionId is required');
    }
    const query = new GetRoomSessionRtpCapabilitiesQuery(params.sessionId);

    const result = await this.queryBus.execute(query);

    return new DataResponse(result);
  }

  @Post('/:sessionId/web-transports')
  @HttpCode(HttpStatus.CREATED)
  async createWebTransport(
    @Param() params: RoomSessionRequestParamsDto,
    @Body() body: CreateTransportRequestDto,
  ): Promise<DataResponse<WebTransportOptionsDto>> {
    if (!params.sessionId) {
      throw new BadRequestException('SessionId is required');
    }
    const command = new CreateWebTransportCommand(
      params.sessionId,
      body.direction,
    );

    const result = await this.commandBus.execute<
      CreateWebTransportCommand,
      WebTransportOptionsDto
    >(command);

    return new DataResponse(result);
  }

  @Post('/:sessionId/web-transports/connect')
  @HttpCode(HttpStatus.NO_CONTENT)
  async connectWebTransport(
    @Param() params: RoomSessionRequestParamsDto,
    @Body() body: ConnectSessionWebTransportRequestDto,
  ): Promise<void> {
    if (!params.sessionId) {
      throw new BadRequestException('SessionId is required');
    }
    const command = new ConnectSessionWebTransportCommand(
      params.sessionId,
      body.direction,
      body.dtlsParameters,
    );

    await this.commandBus.execute<ConnectSessionWebTransportCommand, void>(
      command,
    );
  }

  @Post('/:sessionId/web-transports/action')
  @HttpCode(HttpStatus.NO_CONTENT)
  async executeTransportAction(
    @Param() params: RoomSessionRequestParamsDto,
    @Body() body: ExecuteSessionTransportActionRequestDto,
  ): Promise<void> {
    if (!params.sessionId) {
      throw new BadRequestException('SessionId is required');
    }
    const command = new ExecuteSessionTransportActionCommand(
      params.sessionId,
      body.direction,
      body.action,
    );

    await this.commandBus.execute<ExecuteSessionTransportActionCommand>(
      command,
    );
  }

  @Post('/:sessionId/producers')
  @HttpCode(HttpStatus.CREATED)
  async createProducer(
    @Param() params: RoomSessionRequestParamsDto,
    @Body() body: CreateSessionProducerRequestDto,
  ): Promise<DataResponse<string>> {
    if (!params.sessionId) {
      throw new BadRequestException('SessionId is required');
    }
    const command = new CreateSessionProducerCommand(
      params.sessionId,
      body.kind,
      body.rtpParameters,
    );

    const result = await this.commandBus.execute<
      CreateSessionProducerCommand,
      string
    >(command);

    return new DataResponse(result);
  }

  @Post('/:sessionId/producers/:producerId/action')
  @HttpCode(HttpStatus.NO_CONTENT)
  async executeProducerAction(
    @Param() params: RoomSessionProducerRequestParamsDto,
    @Body() body: ExecuteSessionConsumerProducerActionRequestDto,
  ): Promise<void> {
    if (!params.sessionId) {
      throw new BadRequestException('SessionId is required');
    }
    if (!params.producerId) {
      throw new BadRequestException('ProducerId is required');
    }
    const command = new ExecuteSessionProducerActionCommand(
      params.sessionId,
      params.producerId,
      body.action,
    );

    await this.commandBus.execute<ExecuteSessionProducerActionCommand>(command);
  }

  @Post('/:sessionId/consumers')
  @HttpCode(HttpStatus.CREATED)
  async createConsumer(
    @Param() params: RoomSessionRequestParamsDto,
    @Body() body: CreateSessionConsumerRequestDto,
  ): Promise<DataResponse<ConsumerResponseDto>> {
    if (!params.sessionId) {
      throw new BadRequestException('SessionId is required');
    }
    const command = new CreateSessionConsumerCommand(
      params.sessionId,
      body.participantId,
      body.rtpCapabilities,
    );

    const result = await this.commandBus.execute<
      CreateSessionConsumerCommand,
      ConsumerResponseDto
    >(command);

    return new DataResponse(result);
  }

  @Post('/:sessionId/consumers/:consumerId/action')
  @HttpCode(HttpStatus.NO_CONTENT)
  async executeConsumerAction(
    @Param() params: RoomSessionConsumerRequestParamsDto,
    @Body() body: ExecuteSessionConsumerProducerActionRequestDto,
  ): Promise<void> {
    if (!params.sessionId) {
      throw new BadRequestException('SessionId is required');
    }
    if (!params.consumerId) {
      throw new BadRequestException('ConsumerId is required');
    }
    const command = new ExecuteSessionConsumerActionCommand(
      params.sessionId,
      params.consumerId,
      body.action,
    );

    await this.commandBus.execute<ExecuteSessionConsumerActionCommand>(command);
  }
}
