import { Injectable } from '@nestjs/common';
import CategoryRepository from './repositories/category.repository';
import Category from '../../../sequelize/models/category.model';
import {
  Attributes,
  CreationAttributes,
  FindOptions,
  WhereOptions,
  CreateOptions,
  SaveOptions,
  InstanceDestroyOptions,
  FindAndCountOptions,
} from 'sequelize';
import PaginationDto from 'dto/pagination.dto';

@Injectable()
export default class CategoryCrudService {
  private readonly repository: CategoryRepository;

  constructor() {
    this.repository = new CategoryRepository();
  }

  public create = async (
    dto: CreationAttributes<Category>,
    options?: CreateOptions<Attributes<Category>>,
  ) => {
    return await this.repository.create(dto);
  };

  public findAllPaginated = async (
    dto: PaginationDto,
    query?: WhereOptions<Attributes<Category>>,
    options?: Omit<
      FindAndCountOptions<Attributes<Category>>,
      'where' | 'offset' | 'limit'
    >,
  ) => {
    return await this.repository.findAllPaginated(dto, query, options);
  };

  public findOne = async (
    query: WhereOptions<Attributes<Category>>,
    validate: boolean,
    options?: Omit<FindOptions<Attributes<Category>>, 'where'>,
  ) => {
    return await this.repository.findOne(query, validate, options);
  };

  public updateByPk = async (
    primaryKey: string,
    dto: Partial<Attributes<Category>>,
    options?: SaveOptions<Attributes<Category>>,
  ) => {
    return await this.repository.updateByPk(primaryKey, dto, options);
  };
  public deleteByPk = async (
    primaryKey: string,
    options?: InstanceDestroyOptions,
  ) => {
    return await this.repository.deleteByPk(primaryKey, options);
  };
}
