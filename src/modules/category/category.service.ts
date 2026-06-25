import { ConflictException, Injectable } from '@nestjs/common';
import CategoryCrudService from './category-crud.service';
import CreateCategoryDto from '../../../dto/create-category.dto';
import Category from '../../../sequelize/models/category.model';
import {
  Attributes,
  CreationAttributes,
  FindAndCountOptions,
  Op,
  WhereOptions,
} from 'sequelize';
import { CUSTOM_RES } from '../../../constants/messages.constant';
import UpdateCategoryDto from 'dto/update-category.dto';
import PaginationDto from 'dto/pagination.dto';

@Injectable()
export class CategoryService {
  p;
  constructor(private readonly categoryCrudService: CategoryCrudService) {}

  public async create(dto: CreateCategoryDto) {
    const existing = await this.categoryCrudService.findOne(
      { name: dto.name },
      false,
    );

    if (existing)
      throw new ConflictException(
        CUSTOM_RES({
          code: 'SWM-007',
          message: 'Ya existe una categoría con ese nombre',
        }),
      );

    const created = await this.categoryCrudService.create({
      ...dto,
    } as CreationAttributes<Category>);

    return CUSTOM_RES({
      message: 'Categoría creada correctamente',
      data: created,
    });
  }

  public async listPaginated(dto: PaginationDto) {
    const orderDirection =
      (dto.orderDirection?.toUpperCase() as 'ASC' | 'DESC') || 'ASC';

    const options: Omit<
      FindAndCountOptions<Attributes<Category>>,
      'where' | 'offset' | 'limit'
    > = {
      attributes: ['id', 'name', 'description'],
      order: dto.orderBy
        ? [[dto.orderBy, orderDirection]]
        : [['created_at', 'ASC']],
    };

    let whereClause: WhereOptions<Category> = {};

    if (dto.search && dto.search.trim()) {
      const searchTerm = `%${dto.search.trim()}%`;
    }

    const response = await this.categoryCrudService.findAllPaginated(
      dto,
      whereClause,
      options,
    );

    return { ...response };
  }

  public async findById(query: WhereOptions<Category>) {
    return await this.categoryCrudService.findOne(query, true, {
      attributes: ['id', 'name', 'created_at'],
    });
  }

  public async update(id: string, dto: UpdateCategoryDto) {
    await this.categoryCrudService.findOne({ id }, true);

    if (dto.name) {
      const existing = await this.categoryCrudService.findOne(
        {
          name: dto.name,
          id: { [Op.ne]: id },
        },
        false,
      );

      if (existing)
        throw new ConflictException(
          CUSTOM_RES({
            code: 'SWM-007',
            message: 'Ya existe una categoría con ese nombre',
          }),
        );
    }

    await this.categoryCrudService.updateByPk(id, dto);

    return CUSTOM_RES({
      message: 'Categoría de reporte actualizada correctamente',
      data: { id },
    });
  }
  public async delete(id: string) {
    await this.categoryCrudService.findOne({ id }, true);

    await this.categoryCrudService.deleteByPk(id);

    return CUSTOM_RES({
      message: 'Categoría eliminada correctamente',
      data: { id },
    });
  }
}
