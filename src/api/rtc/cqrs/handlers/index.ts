import { QueryHandlers } from './queries';
import { CommandHandlers } from '@api/rtc/cqrs/handlers/commands';

export * from './queries';

export const Handlers = [...QueryHandlers, ...CommandHandlers];
