import {
  IRoom,
  ISearchMetadata,
  IRoomFilter,
  IRoomParticipant,
} from '@domain/primitives';

export interface IRoomService {
  create(input: IRoom): Promise<IRoom>;
  replace(id: string, input: IRoom): Promise<IRoom | null>;
  getParticipantById(
    roomId: string,
    participantId: string,
  ): Promise<IRoomParticipant | null>;
  getParticipantByUserId(
    roomId: string,
    userId: string,
  ): Promise<IRoomParticipant | null>;
  patchParticipant(
    roomId: string,
    participantId: string,
    patch: Partial<Omit<IRoomParticipant, 'id' | 'createdAt'>>,
  ): Promise<IRoomParticipant | null>;
  delete(id: string): Promise<IRoom | null>;
  getById(id: string): Promise<IRoom | null>;
  search(
    filter: IRoomFilter,
    options?: ISearchMetadata,
  ): Promise<[IRoom[], ISearchMetadata]>;
}
