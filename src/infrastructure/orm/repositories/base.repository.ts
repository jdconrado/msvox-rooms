import { BaseEntity } from '@infra/orm/entities';
import { FindOptionsOrder, MongoRepository, FilterOperators } from 'typeorm';
import { IRepository } from '@infra/orm/primitives';
import { IModel, ISearchMetadata } from '@domain/primitives';
import { Mapper } from '@automapper/core';
import { ObjectId } from 'mongodb';
import { APP_VARIABLES } from '@config/app-variables.config';
import { SortDirectionEnum } from '@domain/enums';
import { OffsetPagination, Sorting } from '@domain/models';

export class BaseRepository<E extends BaseEntity, M extends IModel>
  implements IRepository<M>
{
  constructor(
    protected readonly repository: MongoRepository<E>,
    private readonly entity: new (...args: any[]) => E,
    private readonly model: new (...args: any[]) => M,
    private readonly mapper: Mapper,
  ) {}

  async create(input: M): Promise<M> {
    const entity = this.mapToEntity(input as M);
    const result = await this.repository.save(entity);

    return this.mapToModel(result);
  }

  async delete(id: string): Promise<M | null> {
    const entity = await this.repository.findOne({
      where: { _id: new ObjectId(id) },
    });
    if (!entity) {
      return null;
    }
    await this.repository.remove(entity);

    this.mapToModel(entity);
  }

  async getById(id: string): Promise<M | null> {
    const entity = await this.repository.findOne({
      where: { _id: new ObjectId(id) },
    });
    if (!entity) {
      return null;
    }

    return this.mapToModel(entity);
  }

  async replace(id: string, input: M): Promise<M | null> {
    const entity = await this.repository.findOne({
      where: { _id: new ObjectId(id) },
    });
    if (!entity) {
      return null;
    }
    entity.update(input);
    const result = await this.repository.save(entity);

    return this.mapToModel(result);
  }

  async search(
    filter: object,
    options?: ISearchMetadata,
  ): Promise<[M[], ISearchMetadata]> {
    const pagination = new OffsetPagination(
      options?.pagination.offset ?? 0,
      options?.pagination.limit ?? APP_VARIABLES.APP_PAGINATION_LIMIT,
    );

    const sorting = new Sorting(
      options?.sorting?.orderField ?? 'createdAt',
      options?.sorting?.orderDirection ?? SortDirectionEnum.DESC,
    );

    const orderOptions: FindOptionsOrder<E | { [att: string]: unknown }> = {
      [sorting.orderField]: sorting.orderDirection,
    };

    const queryObject = this.filterToQueryObject(filter);

    const result = await this.repository.findAndCount({
      skip: pagination.offset,
      take: pagination.limit,
      where: queryObject,
      order: orderOptions as FindOptionsOrder<E>,
    });

    pagination.count = result[1];

    return [
      this.mapArrayToModel(result[0]),
      {
        sorting,
        pagination,
      },
    ];
  }

  protected filterToQueryObject(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    filter?: object,
  ): Partial<E> | FilterOperators<E> {
    throw new Error('Method not implemented.');
  }

  protected mapToModel(entity: E): M {
    return this.mapper.map(entity, this.entity, this.model);
  }

  protected mapArrayToModel(entities: E[]): M[] {
    return this.mapper.mapArray(entities, this.entity, this.model);
  }

  protected mapToEntity(model: M): E {
    return this.mapper.map(model, this.model, this.entity);
  }
}
