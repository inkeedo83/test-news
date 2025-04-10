import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import { pick } from 'lodash';
import { PaginatedEntityDto } from 'src/common/types/types';
import { ArticleDto, CreateArticleDto, ReadArticlesDto, UpdateArticleDto } from 'src/modules/article/dto/article.dto';
import { AppConfig } from 'src/modules/config/validation.schema';
import { Article, ArticleTag } from 'src/modules/database/entities/article.entity';
import { Tag } from 'src/modules/database/entities/tag.entity';
import { StorageService } from 'src/modules/storage/services/storage.service';
import { DataSource, EntityManager, FindOptionsWhere, ILike, In } from 'typeorm';

@Injectable()
export class ArticleService {
  private manager: EntityManager;
  constructor(
    private readonly dataSource: DataSource,
    private readonly storageService: StorageService,
    private readonly config: ConfigService<AppConfig, true>
  ) {
    this.manager = this.dataSource.manager;
  }

  async create({ tagsIds, image, ...data }: CreateArticleDto): Promise<ArticleDto> {
    const articleToCreate = this.manager.create(Article, { ...data });
    let article: Article;

    if (image) {
      const imageFilename = `${randomUUID()}.${image.mimetype.split('/')[1]}`;

      articleToCreate.image = image ? imageFilename : articleToCreate.image;

      await this.storageService.uploadFile(imageFilename, image.buffer);
      article = await this.manager.save(Article, articleToCreate);
    } else article = await this.manager.save(Article, articleToCreate);

    if (tagsIds !== undefined && tagsIds.length > 0) {
      const tags = await this.manager.find(Tag, { where: { id: In(tagsIds) } });

      await this.manager.save(
        ArticleTag,
        tags.map(tag => ({ tagId: tag.id, articleId: article.id }))
      );
    }

    return this.mapArticleToArticleDto(article.id);
  }
  async read({
    limit,
    offset,
    pattern,
    order,
    category,
    isImportant,
    tagsIds
  }: ReadArticlesDto): Promise<PaginatedEntityDto<ArticleDto>> {
    const criteria1: FindOptionsWhere<Article> = pattern === undefined ? {} : { title: ILike(`%${pattern}%`) };
    const criteria2: FindOptionsWhere<Article> = pattern === undefined ? {} : { content: ILike(`%${pattern}%`) };

    if (category) {
      criteria1.category = category;
      criteria2.category = category;
    }
    if (tagsIds) {
      criteria1.articleTags = { tagId: In(tagsIds) };
      criteria2.articleTags = { tagId: In(tagsIds) };
    }
    if (isImportant) {
      criteria1.isImportant = isImportant;
      criteria2.isImportant = isImportant;
    }

    const [data, count] = await this.manager.findAndCount(Article, {
      where: [criteria1, criteria2],
      take: limit ?? 100,
      skip: offset ?? 0,
      order: { createdAt: order ?? 'DESC' }
    });

    return { data: await Promise.all(data.map(article => this.mapArticleToArticleDto(article.id))), count };
  }
  async readOne(id: string): Promise<ArticleDto> {
    const article = await this.manager.findOne(Article, { where: { id } });

    if (!article) throw new NotFoundException(`Article with id ${id} not found`);

    return this.mapArticleToArticleDto(article.id);
  }
  async readOnePublic(id: string): Promise<ArticleDto> {
    const article = await this.manager.findOne(Article, { where: { id } });

    if (!article) throw new NotFoundException(`Article with id ${id} not found`);
    article.watchCount++;

    await this.manager.save(Article, article);

    return this.mapArticleToArticleDto(article.id);
  }
  async update(
    id: string,
    { category, tagsIds, title, content, isImportant, image, removeImage }: UpdateArticleDto
  ): Promise<ArticleDto> {
    const article = await this.manager.findOne(Article, {
      where: { id },
      relations: { articleTags: { tag: true } }
    });

    if (!article) throw new NotFoundException(`Article with id ${id} not found`);

    article.title = title ?? article.title;
    article.content = content ?? article.content;
    article.isImportant = isImportant ?? article.isImportant;
    article.category = category ?? article.category;

    if (image) {
      if (article.image !== null) await this.storageService.deleteFile(article.image);

      article.image = `${randomUUID()}.${image.mimetype.split('/')[1]}`;
      await this.storageService.uploadFile(article.image, image.buffer);
    }

    if (removeImage) {
      if (article.image !== null) await this.storageService.deleteFile(article.image);
      article.image = null;
    }
    await this.manager.save(article);

    if (tagsIds)
      if (tagsIds.length === 0) await this.manager.delete(ArticleTag, { articleId: id });
      else {
        for (const tagId of tagsIds) {
          const existTag = await this.manager.findOne(Tag, { where: { id: tagId } });

          if (!article.articleTags.map(t => t.tagId).includes(tagId) && existTag)
            await this.manager.save(ArticleTag, { articleId: id, tagId });
        }

        await Promise.all(
          article.articleTags.map(async t => {
            if (!tagsIds.some(tId => tId === t.tagId)) await this.manager.remove(ArticleTag, t);
          })
        );
      }

    return this.mapArticleToArticleDto(article.id);
  }

  async updateImage(id: string, image: Express.Multer.File): Promise<ArticleDto> {
    const article = await this.manager.findOne(Article, {
      where: { id }
    });

    if (!article) throw new NotFoundException(`Article with id ${id} not found`);

    if (image) {
      const imageFilename = `${randomUUID()}.${image.mimetype.split('/')[1]}`;

      article.image = image ? imageFilename : article.image;

      await this.storageService.uploadFile(imageFilename, image.buffer).then(async () => {
        await this.manager.save(Article, article);
      });
    }

    return this.mapArticleToArticleDto(article.id);
  }

  async delete(id: string): Promise<ArticleDto> {
    const article = await this.manager.findOne(Article, { where: { id } });

    if (!article) throw new NotFoundException(`Article with id ${id} not found`);

    await this.manager.remove(article);

    return this.mapArticleToArticleDto(article.id);
  }

  async deleteImage(id: string): Promise<ArticleDto> {
    const article = await this.manager.findOne(Article, { where: { id } });

    if (!article) throw new NotFoundException(`Article with id ${id} not found`);

    article.image = null;

    await this.manager.save(Article, article);

    return this.mapArticleToArticleDto(article.id);
  }

  async mapArticleToArticleDto(id: string): Promise<ArticleDto> {
    const article = await this.manager.findOne(Article, {
      where: { id },
      relations: { articleTags: { tag: true } }
    });

    if (!article) throw new NotFoundException(`Article with id ${id} not found`);

    return {
      ...pick(article, ['id', 'title', 'content', 'watchCount', 'isImportant', 'createdAt', 'updatedAt', 'category']),
      image: `${this.config.get('BASE_URL')}/api/image/${article.image}`,
      isRelated: article.watchCount >= 10,
      tags: article.articleTags.map(tag => ({ id: tag.tag.id, name: tag.tag.name })),
      header: article.title.length >= 50 ? article.title.substring(0, 50) + '...' : article.title,
      shortContent: article.content.split(/\s+/).slice(0, 15).join(' ') + '...'
    };
  }
}
