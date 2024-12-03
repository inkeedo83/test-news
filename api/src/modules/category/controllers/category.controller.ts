import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Category, CategoryService } from 'src/modules/category/services/category.service';

@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiOperation({ summary: 'Read Categories' })
  @ApiOkResponse({ status: 200, description: 'Category read successfully' })
  async read(): Promise<Category[]> {
    return await this.categoryService.read();
  }
}
