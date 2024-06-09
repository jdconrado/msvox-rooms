import { AddParticipantCommandHandler } from './add-participant-command.handler';
import { CreateRoomCommandHandler } from './create-room-command.hanlder';

export * from './create-room-command.hanlder';
export * from './add-participant-command.handler';

export const CommandHandlers = [
  CreateRoomCommandHandler,
  AddParticipantCommandHandler,
];
