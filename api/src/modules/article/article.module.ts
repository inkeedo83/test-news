import { Module } from '@nestjs/common';
import { ArticleController } from 'src/modules/article/controllers/article.controller';
import { KeyController } from 'src/modules/article/controllers/key.controller';
import { ProxyController } from 'src/modules/article/controllers/proxy.controller';
import { ArticleService } from 'src/modules/article/services/article.service';
import { StorageModule } from 'src/modules/storage/storage.module';

@Module({
  imports: [StorageModule],
  controllers: [ArticleController, ProxyController, KeyController],
  providers: [ArticleService],
  exports: [ArticleService]
})
export class ArticleModule {}
