import { ErrorSeverity } from '../../enums/error-severity.enum';

import { EscalationTeam } from '../../enums/escalation-team';

import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import Category from './category.model';
import { literal } from 'sequelize';

@Table({
  tableName: 'wiki_errors',
  timestamps: true,
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
})
export default class WikiError extends Model<WikiError> {
  @PrimaryKey
  @Column({
    type: DataType.STRING(255),
    primaryKey: true,
    defaultValue: literal('gen_random_uuid()'),
  })
  declare id: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    unique: true,
  })
  declare code: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare name: string;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    field: 'category_id',
  })
  declare categoryId: string;

  @BelongsTo(() => Category)
  declare category: Category;

  @Column({
    type: DataType.ENUM(...Object.values(ErrorSeverity)),
    allowNull: false,
  })
  declare severity: ErrorSeverity;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare description: string;

  @Column({
    type: DataType.ARRAY(DataType.STRING(255)),
    allowNull: true,
    defaultValue: [],
  })
  declare symptoms: string[];

  @Column({
    type: DataType.ARRAY(DataType.STRING(255)),
    allowNull: true,
    defaultValue: [],
    field: 'possible_causes',
  })
  declare possibleCauses: string[];

  @Column({
    type: DataType.JSONB,
    allowNull: true,
    defaultValue: { images: [], logs: [] },
  })
  declare evidence: {
    images: { url: string; caption?: string }[];
    logs: string[];
  };

  @Column({
    type: DataType.ARRAY(DataType.STRING(255)),
    allowNull: true,
    defaultValue: [],
  })
  declare solution: string[];

  @Column({
    type: DataType.ENUM(...Object.values(EscalationTeam)),
    allowNull: true,
  })
  declare escalation: EscalationTeam;

  @Column({
    type: DataType.ARRAY(DataType.STRING(255)),
    allowNull: true,
    defaultValue: [],
    field: 'related_docs',
  })
  declare relatedDocs: string[];

  @Column({
    type: DataType.ARRAY(DataType.STRING(50)),
    allowNull: true,
    defaultValue: [],
  })
  declare keywords: string[];
}
