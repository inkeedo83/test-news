import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { PaginatedEntityDto } from 'src/common/types/types';
import {
  ArticleDto,
  CreateArticleDto,
  DeleteArticleDto,
  ReadArticlesDto,
  ReadOneArticleDto,
  UpdateArticleDto
} from 'src/modules/article/dto/article.dto';
import { ArticleService } from 'src/modules/article/services/article.service';
import { AuthorizationGuard } from 'src/modules/auth0/authorization.guard';

@ApiTags('Articles')
@ApiBearerAuth('jwt')
@UseGuards(AuthorizationGuard)
@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @ApiOperation({ summary: 'Create article' })
  @ApiCreatedResponse({ status: 201, description: 'Article created successfully', type: ArticleDto })
  @ApiResponse({ status: 400, description: 'Invalid request' })
  @ApiBody({ type: CreateArticleDto })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  async create(@UploadedFile() image: Express.Multer.File, @Body() body: CreateArticleDto): Promise<ArticleDto> {
    body.image = image;

    return this.articleService.create(body);
  }

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
    return this.articleService.readOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update article' })
  @ApiCreatedResponse({ status: 201, description: 'Article created successfully', type: ArticleDto })
  @ApiResponse({ status: 400, description: 'Invalid request' })
  @ApiNotFoundResponse({ status: 404, description: 'Article not found' })
  @ApiBody({ type: UpdateArticleDto })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @UploadedFile() image: Express.Multer.File | null | undefined,
    @Param() { id }: ReadOneArticleDto,
    @Body() body: UpdateArticleDto
  ): Promise<ArticleDto> {
    body.image = image ?? undefined;

    return this.articleService.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete article' })
  @ApiOkResponse({ status: 200, description: 'Article deleted successfully', type: ArticleDto })
  @ApiResponse({ status: 400, description: 'Invalid request' })
  @ApiNotFoundResponse({ status: 404, description: 'Article not found' })
  async delete(@Param() { id }: DeleteArticleDto): Promise<ArticleDto> {
    return this.articleService.delete(id);
  }
}
