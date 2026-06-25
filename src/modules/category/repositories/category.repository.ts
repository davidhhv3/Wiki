import AbstractRepository from '../../../../sequelize/crud/abstract.repository';
import { Logger } from '@nestjs/common';
import Category from '../../../../sequelize/models/category.model';
import randomNumericId from '../../../../utils/random-numeric-id.util';

export default class CategoryRepository extends AbstractRepository<Category> {
  constructor() {
    super(Category, {
      idGenerator: () => randomNumericId('RC', 16),
      logger: new Logger(CategoryRepository.name),
      singleName: 'la categoría',
      pluralName: 'las categorías',
    });
  }
}
