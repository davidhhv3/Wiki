import { Logger } from '@nestjs/common';
import { Model } from 'sequelize';

export default interface IRepositoryOptions<T extends Model> {
  idGenerator: () => string;
  logger?: Logger;
  singleName?: string;
  pluralName?: string;
}
