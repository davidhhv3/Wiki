import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import CategoryCrudService from './category-crud.service';
import { CategoryController } from './category.controller';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, CategoryCrudService],
})
export class CategoryModule {}
