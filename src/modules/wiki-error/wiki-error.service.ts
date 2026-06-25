import { ConflictException, Injectable } from '@nestjs/common';
import WikiErrorCrudService from './wiki-error-crud.service';
import CreateWikiErrorDto from '../../../dto/create-wiki-error.dto';
import WikiError from '../../../sequelize/models/wikiError.model';
import {
  Attributes,
  CreationAttributes,
  FindAndCountOptions,
  Op,
  WhereOptions,
} from 'sequelize';
import { CUSTOM_RES } from '../../../constants/messages.constant';
import UpdateWikiErrorDto from 'dto/update-wiki-error.dto';
import PaginationDto from 'dto/pagination.dto';

@Injectable()
export class WikiErrorService {
  constructor(private readonly wikiErrorCrudService: WikiErrorCrudService) {}

  public async create(dto: CreateWikiErrorDto) {
    const existing = await this.wikiErrorCrudService.findOne(
      { code: dto.code },
      false,
    );

    if (existing)
      throw new ConflictException(
        CUSTOM_RES({
          code: 'SWM-007',
          message: 'Ya existe un error de wiki con ese código',
        }),
      );

    const created = await this.wikiErrorCrudService.create({
      ...dto,
    } as CreationAttributes<WikiError>);

    return CUSTOM_RES({
      message: 'Error de wiki creado correctamente',
      data: created,
    });
  }

  public async listPaginated(dto: PaginationDto) {
    const orderDirection =
      (dto.orderDirection?.toUpperCase() as 'ASC' | 'DESC') || 'ASC';

    const options: Omit<
      FindAndCountOptions<Attributes<WikiError>>,
      'where' | 'offset' | 'limit'
    > = {
      attributes: [
        'id',
        'code',
        'name',
        'categoryId',
        'severity',
        'description',
        'symptoms',
        'possibleCauses',
        'evidence',
        'solution',
        'escalation',
        'relatedDocs',
        'keywords',
      ],
      order: dto.orderBy
        ? [[dto.orderBy, orderDirection]]
        : [['created_at', 'ASC']],
    };

    let whereClause: WhereOptions<WikiError> = {};

    if (dto.search && dto.search.trim()) {
      const searchTerm = `%${dto.search.trim()}%`;
      whereClause = {
        [Op.or]: [
          { code: { [Op.iLike]: searchTerm } },
          { name: { [Op.iLike]: searchTerm } },
          { description: { [Op.iLike]: searchTerm } },
        ],
      };
    }

    const response = await this.wikiErrorCrudService.findAllPaginated(
      dto,
      whereClause,
      options,
    );

    return { ...response };
  }

  public async findById(query: WhereOptions<WikiError>) {
    return await this.wikiErrorCrudService.findOne(query, true, {
      attributes: [
        'id',
        'code',
        'name',
        'categoryId',
        'severity',
        'description',
        'symptoms',
        'possibleCauses',
        'evidence',
        'solution',
        'escalation',
        'relatedDocs',
        'keywords',
        'created_at',
      ],
    });
  }

  public async update(id: string, dto: UpdateWikiErrorDto) {
    await this.wikiErrorCrudService.findOne({ id }, true);

    if (dto.code) {
      const existing = await this.wikiErrorCrudService.findOne(
        {
          code: dto.code,
          id: { [Op.ne]: id },
        },
        false,
      );

      if (existing)
        throw new ConflictException(
          CUSTOM_RES({
            code: 'SWM-007',
            message: 'Ya existe un error de wiki con ese código',
          }),
        );
    }

    await this.wikiErrorCrudService.updateByPk(id, dto);

    return CUSTOM_RES({
      message: 'Error de wiki actualizado correctamente',
      data: { id },
    });
  }

  public async delete(id: string) {
    await this.wikiErrorCrudService.findOne({ id }, true);

    await this.wikiErrorCrudService.deleteByPk(id);

    return CUSTOM_RES({
      message: 'Error de wiki eliminado correctamente',
      data: { id },
    });
  }
}
