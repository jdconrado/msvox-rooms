import { IModel } from '../../../../domain/primitives/base-model.interface';
import { ISearchMetadata } from '../../../../domain/primitives/common/search-metadata.interface';

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
