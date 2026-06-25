import {
  IsArray,
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { ErrorSeverity } from '../enums/error-severity.enum';
import { EscalationTeam } from '../enums/escalation-team';

export default class CreateWikiErrorDto {
  @IsString()
  @Length(1, 20)
  declare code: string;

  @IsString()
  @Length(1, 100)
  declare name: string;

  @IsString()
  declare categoryId: string;

  @IsEnum(ErrorSeverity)
  declare severity: ErrorSeverity;

  @IsString()
  declare description: string;

  @IsOptional()
  @IsArray()
  declare symptoms?: string[];

  @IsOptional()
  @IsArray()
  declare possibleCauses?: string[];

  @IsOptional()
  @IsObject()
  declare evidence?: {
    images: { url: string; caption?: string }[];
    logs: string[];
  };

  @IsOptional()
  @IsArray()
  declare solution?: string[];

  @IsOptional()
  @IsEnum(EscalationTeam)
  declare escalation?: EscalationTeam;

  @IsOptional()
  @IsArray()
  declare relatedDocs?: string[];

  @IsOptional()
  @IsArray()
  declare keywords?: string[];
}
