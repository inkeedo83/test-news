import { Module } from '@nestjs/common';
import { ArticleModule } from 'src/modules/article/article.module';
import { Auth0Module } from 'src/modules/auth0/auth0.module';
import { CategoryModule } from 'src/modules/category/category.module';
import { AppConfigModule } from 'src/modules/config/config.module';
import { DatabaseModule } from 'src/modules/database/database.module';
import { AppLoggerModule } from 'src/modules/logger/appLogger.module';
import { NewsModule } from 'src/modules/news/news.module';
import { TagModule } from 'src/modules/tag/tag.module';

@Module({
  imports: [
    AppConfigModule,
    Auth0Module,
    AppLoggerModule,
    DatabaseModule,
    ArticleModule,
    CategoryModule,
    TagModule,
    NewsModule
  ]
})
export class AppModule {}
