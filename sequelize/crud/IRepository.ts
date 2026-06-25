import {
  Attributes,
  BulkCreateOptions,
  CreateOptions,
  CreationAttributes,
  FindAndCountOptions,
  FindOptions,
  FindOrCreateOptions,
  InstanceDestroyOptions,
  InstanceRestoreOptions,
  SaveOptions,
  Transaction,
  WhereOptions,
} from 'sequelize';
import { Model } from 'sequelize-typescript';
import PaginationDto from '../../dto/pagination.dto';
import PaginatedResponseInterface from '../../interfaces/paginated-response.interface';

export interface IRepository<TModel extends Model> {
  create(
    dto: CreationAttributes<TModel>,
    options?: CreateOptions<TModel>,
  ): Promise<TModel>;
  insert(
    dto: CreationAttributes<TModel>,
    options?: CreateOptions<TModel>,
  ): Promise<TModel>;
  insertMany(
    dtos: CreationAttributes<TModel>[],
    options?: BulkCreateOptions<Attributes<TModel>>,
  ): Promise<TModel[]>;
  findOrCreate(
    options: FindOrCreateOptions<
      Attributes<TModel>,
      CreationAttributes<TModel>
    >,
  ): Promise<[TModel, boolean]>;
  findByPk(
    primaryKey: string | number,
    validate: boolean,
    options?: Omit<FindOptions<Attributes<TModel>>, 'where'>,
  ): Promise<TModel>;
  findOne(
    query: WhereOptions<Attributes<TModel>>,
    validate: boolean,
    options?: Omit<FindOptions<Attributes<TModel>>, 'where'>,
  ): Promise<TModel>;
  findAll(
    query?: WhereOptions<Attributes<TModel>>,
    options?: Omit<FindOptions<Attributes<TModel>>, 'where'>,
  ): Promise<TModel[]>;
  findAllPaginated(
    dto: PaginationDto,
    query?: WhereOptions<Attributes<TModel>>,
    options?: Omit<
      FindAndCountOptions<Attributes<TModel>>,
      'where' | 'offset' | 'limit'
    >,
  ): Promise<PaginatedResponseInterface<TModel>>;
  updateByPk(
    primaryKey: string | number,
    dto: Partial<Attributes<TModel>>,
    options?: SaveOptions<Attributes<TModel>>,
  ): Promise<TModel | null>;
  deleteByPk(
    primaryKey: string | number,
    options?: InstanceDestroyOptions,
  ): Promise<TModel | null>;
  restoreByPk(
    primaryKey: string | number,
    options?: InstanceRestoreOptions,
  ): Promise<TModel | null>;
  transaction<R>(
    runInTransaction: (transaction: Transaction) => Promise<R>,
  ): Promise<R>;
}
