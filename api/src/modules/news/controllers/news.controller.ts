import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginatedEntityDto } from 'src/common/types/types';
import { ArticleDto, ReadArticlesDto, ReadOneArticleDto } from 'src/modules/article/dto/article.dto';
import { ArticleService } from 'src/modules/article/services/article.service';

@ApiTags('Public Articles')
@Controller('public/articles')
export class NewsController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  @ApiOperation({ summary: 'Read articles' })
  @ApiOkResponse({ status: 200, description: 'Articles read successfully', type: PaginatedEntityDto<ArticleDto> })
  @ApiResponse({ status: 400, description: 'Invalid request' })
  async read(@Query() query: ReadArticlesDto): Promise<PaginatedEntityDto<ArticleDto>> {
    return this.articleService.read(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Read article by id' })
  @ApiOkResponse({ status: 200, description: 'Article deleted successfully', type: ArticleDto })
  @ApiResponse({ status: 400, description: 'Invalid request' })
  async readOne(@Param() { id }: ReadOneArticleDto): Promise<ArticleDto> {
    return this.articleService.readOnePublic(id);
  }
}
