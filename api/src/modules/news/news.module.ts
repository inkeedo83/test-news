import { Module } from '@nestjs/common';
import { ArticleModule } from 'src/modules/article/article.module';
import { NewsController } from 'src/modules/news/controllers/news.controller';

@Module({
  imports: [ArticleModule],
  controllers: [NewsController]
})
export class NewsModule {}
