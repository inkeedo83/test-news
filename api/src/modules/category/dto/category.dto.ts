import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { BaseReadDto, IdDto } from 'src/common/types/types';

export class CreateCategoryDto {
  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class ReadCategoriesDto extends BaseReadDto {}
export class UpdateCategoryDto {
  @ApiProperty({ type: String, required: false })
  @IsString()
  @IsNotEmpty()
  name: string;
}
export class DeleteCategoryDto extends IdDto {}
export class ReadCategoryDto extends IdDto {}
