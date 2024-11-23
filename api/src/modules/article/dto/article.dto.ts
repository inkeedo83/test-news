import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBase64,
  IsBoolean,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  ValidateNested
} from 'class-validator';
import { BaseReadDto, IdDto } from 'src/common/types/types';
import { IsNullable } from 'src/common/utils/isNullable';

export class CategoryDto {
  @ApiProperty({ type: String, format: 'uuid' })
  @IsUUID()
  id: string;
  @ApiProperty()
  @IsString()
  name: string;
}
export class TagDto {
  @ApiProperty({ type: String, format: 'uuid' })
  @IsUUID()
  id: string;
  @ApiProperty()
  @IsString()
  name: string;
}
export class ArticleDto extends IdDto {
  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ type: String, nullable: true })
  @IsString()
  @IsBase64()
  @IsNullable()
  image: string | null;

  @ApiProperty({ type: Number, required: true })
  @IsInt()
  @Min(0)
  watchCount: number;

  @ApiProperty({ type: Boolean, required: true })
  @IsBoolean()
  isRelated: boolean;

  @ApiProperty({ type: Boolean, required: true })
  @IsBoolean()
  isImportant: boolean;

  @ApiProperty({ type: CategoryDto })
  @Type(() => CategoryDto)
  @ValidateNested({ each: true })
  category: CategoryDto;

  @ApiProperty({ type: [TagDto], isArray: true })
  @IsArray()
  @Type(() => TagDto)
  @ValidateNested({ each: true })
  tags: TagDto[];

  @ApiProperty({ type: Date, required: true })
  @IsDate()
  createdAt: Date;

  @ApiProperty({ type: Date, required: true })
  @IsDate()
  updatedAt: Date;
}

export class CreateArticleDto extends PickType(ArticleDto, ['title', 'content']) {
  @ApiProperty({ type: String, format: 'uuid' })
  @IsUUID()
  categoryId: string;

  @ApiProperty({ type: Boolean, required: false })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }: { value: unknown }) => value === 'true' || value === true)
  isImportant?: boolean;

  @ApiProperty({ type: String, isArray: true, format: 'uuid', required: false })
  @IsOptional()
  @Transform(({ value }: { value: string | string[] }) => {
    if (Array.isArray(value)) return value;

    if (typeof value === 'string') return value.split(',').filter(item => item.trim() !== '');

    return [];
  })
  @IsArray()
  @IsUUID('all', { each: true })
  tagsIds?: string[];

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  image?: Express.Multer.File;
}

export class ReadArticlesDto extends BaseReadDto {
  @ApiProperty({ type: String, format: 'uuid', required: false })
  @IsUUID()
  @IsOptional()
  categoryId?: string;

  @ApiProperty({ type: String, isArray: true, format: 'uuid', required: false })
  @IsOptional()
  @Transform(({ value }: { value: string | string[] }) => {
    if (Array.isArray(value)) return value;

    if (typeof value === 'string') return value.split(',').filter(item => item.trim() !== '');

    return [];
  })
  @IsArray()
  @IsUUID('all', { each: true })
  tagsIds?: string[];
}

export class UpdateArticleDto extends PartialType(CreateArticleDto) {
  @ApiProperty({ type: Boolean, required: false })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }: { value: unknown }) => value === 'true' || value === true)
  removeImage?: boolean;
}

export class UpdateImageDto {
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @IsOptional()
  image?: Express.Multer.File;
}

export class ReadOneArticleDto extends IdDto {}
export class DeleteArticleDto extends IdDto {}
