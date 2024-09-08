import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { PaginatedEntityDto } from 'src/common/types/types';
import { DeleteCategoryDto } from 'src/modules/category/dto/category.dto';
import { Tag } from 'src/modules/database/entities/tag.entity';
import { CreateTagDto, ReadTagsDto } from 'src/modules/tag/dto/tag.dto';
import { TagService } from 'src/modules/tag/services/tag.service';

@ApiTags('Tags')
@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  @ApiOperation({ summary: 'Create Tag' })
  @ApiCreatedResponse({ status: 201, description: 'Tag created successfully', type: Tag })
  @ApiResponse({ status: 400, description: 'Tag already exists request' })
  async create(@Body() { name }: CreateTagDto): Promise<Tag> {
    return await this.tagService.create(name);
  }

  @Get()
  @ApiOperation({ summary: 'Read Tags' })
  @ApiOkResponse({ status: 200, description: 'Tag created successfully', type: PaginatedEntityDto<Tag> })
  async read(@Query() query: ReadTagsDto): Promise<PaginatedEntityDto<Tag>> {
    return await this.tagService.read(query);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Tag' })
  @ApiOkResponse({ status: 200, description: 'Tag deleted successfully', type: Tag })
  @ApiResponse({ status: 400, description: 'Invalid request' })
  @ApiNotFoundResponse({ status: 404, description: 'Tag not found' })
  async delete(@Param() { id }: DeleteCategoryDto): Promise<Tag> {
    return this.tagService.delete(id);
  }
}
