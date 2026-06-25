import AbstractRepository from '../../../../sequelize/crud/abstract.repository';
import { Logger } from '@nestjs/common';
import WikiError from '../../../../sequelize/models/wikiError.model';
import randomNumericId from '../../../../utils/random-numeric-id.util';

export default class WikiErrorRepository extends AbstractRepository<WikiError> {
  constructor() {
    super(WikiError, {
      idGenerator: () => randomNumericId('WE', 16),
      logger: new Logger(WikiErrorRepository.name),
      singleName: 'el error de wiki',
      pluralName: 'los errores de wiki',
    });
  }
}
