import { IRoom } from 'src/domain/primitives/room.interface';
import { IRepository } from './base.repository.port';
import { ISearchMetadata } from '../../../../domain/primitives/common/search-metadata.interface';
import { IRoomFilter } from '../../../../domain/primitives/filters';

export interface IRoomRepository extends IRepository<IRoom> {
  search(
    filter: IRoomFilter,
    options?: ISearchMetadata,
  ): Promise<[IRoom[], ISearchMetadata]>;
}
