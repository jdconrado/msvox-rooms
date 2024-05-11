import { IRoomService } from '@services/primitives';
import { Injectable, Logger } from '@nestjs/common';
import { IRoom, IRoomFilter, ISearchMetadata } from '@domain/primitives';
import { RoomRepository } from '@infra/orm/repositories';

@Injectable()
export class RoomService implements IRoomService {
  private readonly logger = new Logger(RoomService.name);

  constructor(private readonly repository: RoomRepository) {}

  async create(input: IRoom): Promise<IRoom> {
    this.logger.debug('create({input})', { input });
    const result = await this.repository.create(input);
    this.logger.debug('create: {result}', { result });

    return result;
  }

  delete(id: string): Promise<IRoom | null> {
    this.logger.debug('delete({id})', { id });
    return this.repository.delete(id);
  }

  getById(id: string): Promise<IRoom | null> {
    this.logger.debug('getById({id})', { id });
    return this.repository.getById(id);
  }

  async search(
    filter: IRoomFilter,
    options?: ISearchMetadata,
  ): Promise<[IRoom[], ISearchMetadata]> {
    this.logger.debug('search({filter, pagination, sorting})', {
      filter,
      pagination: options?.pagination,
      sorting: options?.sorting,
    });
    const result = await this.repository.search(filter, options);
    this.logger.debug('search: {count}', { count: result[1].pagination.count });

    return result;
  }

  replace(id: string, input: IRoom): Promise<IRoom | null> {
    this.logger.debug('replace({id}, {input})', { id, input });
    const result = this.repository.replace(id, input);
    this.logger.debug('replace: {result}', { result });

    return result;
  }
}
