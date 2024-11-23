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
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

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
  @Type(() => Boolean)
  isImportant?: boolean;

  @ApiProperty({ type: String, isArray: true, format: 'uuid', required: false })
  @IsOptional()
  @Type(() => UUID)
  @Transform(({ value }: { value: string }) => {
    const result = value.split(',');

    if (result.length === 0) return [];

    return result.filter(item => item !== '');
  })
  @IsArray()
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
  @IsArray()
  @Type(() => UUID)
  tagsIds?: string[];
}

export class UpdateArticleDto extends PartialType(PickType(CreateArticleDto, ['title', 'content', 'isImportant'])) {
  @ApiProperty({ type: String, format: 'uuid', required: false })
  @IsUUID()
  @IsOptional()
  categoryId?: string;

  @ApiProperty({ type: String, isArray: true, format: 'uuid', required: false })
  @IsOptional()
  @IsArray()
  @Type(() => UUID)
  tagsIds?: string[];
}

export class UpdateImageDto {
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @IsOptional()
  image?: Express.Multer.File;
}
export class SomeDto {
  @ApiProperty({ type: 'string', required: false })
  @IsOptional()
  field?: string;

  @ApiProperty({ type: String, format: 'uuid' })
  @IsUUID()
  categoryId: string;

  @ApiProperty({ type: Boolean, required: false })
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  isImportant?: boolean;

  @ApiProperty({ type: String, isArray: true, format: 'uuid', required: false })
  @IsOptional()
  @Transform(({ value }: { value: string }) => {
    console.log({ value });
    console.log({ value: value.split(',') });

    return value.split(',');
  })
  @Type(() => UUID)
  @IsArray()
  tagsIds?: string[];
}

export class ReadOneArticleDto extends IdDto {}
export class DeleteArticleDto extends IdDto {}
