import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import CreateCategoryDto from '../../../dto/create-category.dto';
import UpdateCategoryDto from 'dto/update-category.dto';
import PaginationDto from 'dto/pagination.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  public async create(@Body() dto: CreateCategoryDto) {
    return await this.categoryService.create(dto);
  }
  @Get()
  public async list(@Query() dto: PaginationDto) {
    return await this.categoryService.listPaginated(dto);
  }
  @Get(':id')
  public async findById(@Param('id') id: string) {
    return await this.categoryService.findById({ id });
  }
  @Patch(':id')
  public async update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    return await this.categoryService.update(id, dto);
  }
  @Delete(':id')
  public async delete(@Param('id') id: string) {
    return await this.categoryService.delete(id);
  }
}
