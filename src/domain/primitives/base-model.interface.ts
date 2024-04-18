export interface IModel {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export type ExcludedFromModelCreate =
  | 'id'
  | 'createdAt'
  | 'updatedAt'
  | 'deletedAt';

export type ExcludedFromModelUpdate = ExcludedFromModelCreate;
