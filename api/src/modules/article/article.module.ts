import { Module } from '@nestjs/common';
import { ArticleController } from 'src/modules/article/controllers/article.controller';
import { ArticleService } from 'src/modules/article/services/article.service';

@Module({
  imports: [],
  controllers: [ArticleController],
  providers: [ArticleService],
  exports: [ArticleService]
})
export class ArticleModule {}
