import { CreateWebTransportCommandHandler } from '@api/rtc/cqrs/handlers/commands/create-web-transport-command.handler';
import { CreateRoomSessionCommandHandler } from '@api/rtc/cqrs/handlers/commands/create-room-session-command.handler';
import { ConnectSessionWebTransportCommandHandler } from '@api/rtc/cqrs/handlers/commands/connect-session-web-transport-command.handler';
import { CreateSessionProducerCommandHandler } from '@api/rtc/cqrs/handlers/commands/create-session-producer-command.handler';
import { CreateSessionConsumerCommandHandler } from '@api/rtc/cqrs/handlers/commands/create-session-consumer-command.handler';
import { ExecuteSessionTransportActionCommandHandler } from '@api/rtc/cqrs/handlers/commands/execute-session-transport-action-command.handler';
import { ExecuteSessionProducerActionCommandHandler } from '@api/rtc/cqrs/handlers/commands/execute-session-producer-action-command.handler';
import { ExecuteSessionConsumerActionCommandHandler } from '@api/rtc/cqrs/handlers/commands/execute-session-consumer-action-command.handler';
import { JoinRoomSessionCommandHandler } from './join-room-session-command.handler';
import { LeaveRoomSessionCommandHandler } from './leave-room-session-command.handler';

export * from './create-web-transport-command.handler';
export * from './create-room-session-command.handler';
export * from './connect-session-web-transport-command.handler';
export * from './create-session-producer-command.handler';
export * from './create-session-consumer-command.handler';
export * from './execute-session-transport-action-command.handler';
export * from './execute-session-producer-action-command.handler';
export * from './execute-session-consumer-action-command.handler';
export * from './join-room-session-command.handler';
export * from './leave-room-session-command.handler';

export const CommandHandlers = [
  CreateWebTransportCommandHandler,
  CreateRoomSessionCommandHandler,
  ConnectSessionWebTransportCommandHandler,
  CreateSessionProducerCommandHandler,
  CreateSessionConsumerCommandHandler,
  ExecuteSessionTransportActionCommandHandler,
  ExecuteSessionProducerActionCommandHandler,
  ExecuteSessionConsumerActionCommandHandler,
  JoinRoomSessionCommandHandler,
  LeaveRoomSessionCommandHandler,
];
