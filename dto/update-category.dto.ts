import { IsString, IsOptional, Length } from 'class-validator';

export default class UpdateCategoryDto {
  @IsString()
  @Length(1, 50)
  declare name: string;

  @IsOptional()
  @IsString()
  declare description?: string;
}
