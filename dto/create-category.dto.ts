import { IsString, IsOptional, Length } from 'class-validator';

export default class CreateCategoryDto {
  @IsString()
  @Length(1, 50)
  declare name: string;

  @IsOptional()
  @IsString()
  declare description?: string;

  @IsOptional()
  @IsString()
  @Length(1, 40)
  declare color?: string;
}
