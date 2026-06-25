import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import CreateCategoryDto from '../../../dto/create-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  public async create(@Body() dto: CreateCategoryDto) {
    return this.categoryService.create(dto);
  }
}
