import { IRoom, ISearchMetadata, IRoomFilter } from '@domain/primitives';

export interface IRoomService {
  create(input: IRoom): Promise<IRoom>;
  replace(id: string, input: IRoom): Promise<IRoom | null>;
  delete(id: string): Promise<IRoom | null>;
  getById(id: string): Promise<IRoom | null>;
  search(
    filter: IRoomFilter,
    options?: ISearchMetadata,
  ): Promise<[IRoom[], ISearchMetadata]>;
}
