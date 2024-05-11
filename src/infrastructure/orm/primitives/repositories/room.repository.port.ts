import { IRoom, ISearchMetadata, IRoomFilter } from '@domain/primitives';
import { IRepository } from './base.repository.port';

export interface IRoomRepository extends IRepository<IRoom> {
  search(
    filter: IRoomFilter,
    options?: ISearchMetadata,
  ): Promise<[IRoom[], ISearchMetadata]>;
}
