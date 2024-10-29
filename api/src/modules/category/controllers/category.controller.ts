import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { IdDto, PaginatedEntityDto } from 'src/common/types/types';
import {
  CreateCategoryDto,
  DeleteCategoryDto,
  ReadCategoriesDto,
  ReadCategoryDto,
  UpdateCategoryDto
} from 'src/modules/category/dto/category.dto';
import { CategoryService } from 'src/modules/category/services/category.service';
import { Category } from 'src/modules/database/entities/category.entity';

@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiOperation({ summary: 'Create Category' })
  @ApiCreatedResponse({ status: 201, description: 'Category created successfully', type: Category })
  @ApiResponse({ status: 400, description: 'Category already exists request' })
  async create(@Body() { name }: CreateCategoryDto): Promise<Category> {
    return await this.categoryService.create(name);
  }

  @Get()
  @ApiOperation({ summary: 'Read Categories' })
  @ApiOkResponse({ status: 200, description: 'Category read successfully', type: PaginatedEntityDto<Category> })
  async read(@Query() query: ReadCategoriesDto): Promise<PaginatedEntityDto<Category>> {
    return await this.categoryService.read(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Read Category by id' })
  @ApiOkResponse({ status: 200, description: 'Category read successfully', type: PaginatedEntityDto<Category> })
  async readOne(@Param() { id }: ReadCategoryDto): Promise<Category> {
    return await this.categoryService.readOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Category' })
  @ApiCreatedResponse({ status: 201, description: 'Category updated successfully', type: Category })
  @ApiResponse({ status: 400, description: 'Category already exists request' })
  @ApiNotFoundResponse({ status: 404, description: 'Category not found' })
  async update(@Param() { id }: IdDto, @Body() { name }: UpdateCategoryDto): Promise<Category> {
    return this.categoryService.update(id, name);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Category' })
  @ApiOkResponse({ status: 200, description: 'Category deleted successfully', type: Category })
  @ApiResponse({ status: 400, description: 'Invalid request' })
  @ApiNotFoundResponse({ status: 404, description: 'Category not found' })
  async delete(@Param() { id }: DeleteCategoryDto): Promise<Category> {
    return this.categoryService.delete(id);
  }
}
