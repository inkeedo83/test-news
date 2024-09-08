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
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
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
  UpdateArticleDto,
  UpdateImageDto
} from 'src/modules/article/dto/article.dto';
import { ArticleService } from 'src/modules/article/services/article.service';

@ApiTags('Articles')
@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @ApiOperation({ summary: 'Create article' })
  @ApiCreatedResponse({ status: 201, description: 'Article created successfully', type: ArticleDto })
  @ApiResponse({ status: 400, description: 'Invalid request' })
  async create(@Body() body: CreateArticleDto): Promise<ArticleDto> {
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
  async update(@Param() { id }: ReadOneArticleDto, @Body() body: UpdateArticleDto): Promise<ArticleDto> {
    return this.articleService.update(id, body);
  }

  @Patch('/image/:id')
  @ApiOperation({ summary: 'Update article image' })
  @ApiCreatedResponse({ status: 201, description: 'Article image updated successfully', type: ArticleDto })
  @ApiResponse({ status: 400, description: 'Invalid request' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  async updateImage(
    @Param() { id }: ReadOneArticleDto,
    @Body() body: UpdateImageDto,
    @UploadedFile() image: Express.Multer.File
  ): Promise<ArticleDto> {
    return this.articleService.updateImage(id, image);
  }

  @Delete('image/:id')
  @ApiOperation({ summary: 'Delete article image' })
  @ApiOkResponse({ status: 200, description: 'Article image deleted successfully', type: ArticleDto })
  @ApiResponse({ status: 400, description: 'Invalid request' })
  @ApiNotFoundResponse({ status: 404, description: 'Article not found' })
  async deleteImage(@Param() { id }: DeleteArticleDto): Promise<ArticleDto> {
    return this.articleService.deleteImage(id);
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
