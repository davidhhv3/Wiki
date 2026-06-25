import { Injectable } from '@nestjs/common';
import WikiErrorRepository from './repositories/wiki-error.repository';
import WikiError from '../../../sequelize/models/wikiError.model';
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
export default class WikiErrorCrudService {
  private readonly repository: WikiErrorRepository;

  constructor() {
    this.repository = new WikiErrorRepository();
  }

  public create = async (
    dto: CreationAttributes<WikiError>,
    options?: CreateOptions<Attributes<WikiError>>,
  ) => {
    return await this.repository.create(dto, options);
  };

  public findAllPaginated = async (
    dto: PaginationDto,
    query?: WhereOptions<Attributes<WikiError>>,
    options?: Omit<
      FindAndCountOptions<Attributes<WikiError>>,
      'where' | 'offset' | 'limit'
    >,
  ) => {
    return await this.repository.findAllPaginated(dto, query, options);
  };

  public findOne = async (
    query: WhereOptions<Attributes<WikiError>>,
    validate: boolean,
    options?: Omit<FindOptions<Attributes<WikiError>>, 'where'>,
  ) => {
    return await this.repository.findOne(query, validate, options);
  };

  public updateByPk = async (
    primaryKey: string,
    dto: Partial<Attributes<WikiError>>,
    options?: SaveOptions<Attributes<WikiError>>,
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
