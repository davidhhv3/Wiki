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
import { WikiErrorService } from './wiki-error.service';
import CreateWikiErrorDto from '../../../dto/create-wiki-error.dto';
import UpdateWikiErrorDto from 'dto/update-wiki-error.dto';
import PaginationDto from 'dto/pagination.dto';

@Controller('wiki-error')
export class WikiErrorController {
  constructor(private readonly wikiErrorService: WikiErrorService) {}

  @Post()
  public async create(@Body() dto: CreateWikiErrorDto) {
    return await this.wikiErrorService.create(dto);
  }

  @Get()
  public async list(@Query() dto: PaginationDto) {
    return await this.wikiErrorService.listPaginated(dto);
  }

  @Get(':id')
  public async findById(@Param('id') id: string) {
    return await this.wikiErrorService.findById({ id });
  }

  @Patch(':id')
  public async update(@Param('id') id: string, @Body() dto: UpdateWikiErrorDto) {
    return await this.wikiErrorService.update(id, dto);
  }

  @Delete(':id')
  public async delete(@Param('id') id: string) {
    return await this.wikiErrorService.delete(id);
  }
}
