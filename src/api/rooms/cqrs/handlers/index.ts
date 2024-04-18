import { CommandHandlers } from './commands';
import { QueryHandlers } from './queries';

export * from './commands';
export * from './queries';

export const Handlers = [...CommandHandlers, ...QueryHandlers];
