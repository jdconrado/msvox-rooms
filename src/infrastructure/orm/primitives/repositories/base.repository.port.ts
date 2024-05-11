import { IModel, ISearchMetadata } from '@domain/primitives';

export interface IRepository<TModel extends IModel> {
  create(input: TModel): Promise<TModel>;
  replace(id: string, input: TModel): Promise<TModel | null>;
  delete(id: string): Promise<TModel | null>;
  getById(id: string): Promise<TModel | null>;
  search(
    filter: object,
    options?: ISearchMetadata,
  ): Promise<[TModel[], ISearchMetadata]>;
}
