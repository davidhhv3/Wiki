import { Injectable } from '@nestjs/common';
import CategoryRepository from './repositories/category.repository';
import Category from '../../../sequelize/models/category.model';
import { CreationAttributes } from 'sequelize';

@Injectable()
export default class CategoryCrudService {
  private readonly repository: CategoryRepository;

  constructor() {
    this.repository = new CategoryRepository();
  }

  public create = async (dto: CreationAttributes<Category>) => {
    return await this.repository.create(dto);
  };
}
