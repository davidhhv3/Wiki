import { Injectable } from '@nestjs/common';
import CategoryCrudService from './category-crud.service';
import CreateCategoryDto from '../../../dto/create-category.dto';
import Category from '../../../sequelize/models/category.model';
import { CreationAttributes } from 'sequelize';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryCrudService: CategoryCrudService) {}

  public async create(dto: CreateCategoryDto) {
    const created = await this.categoryCrudService.create({
      ...dto,
    } as CreationAttributes<Category>);
    return created;
  }
}
