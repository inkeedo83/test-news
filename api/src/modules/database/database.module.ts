import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from 'src/modules/database/entities/article.entity';
import { Category } from 'src/modules/database/entities/category.entity';
import { Tag } from 'src/modules/database/entities/tag.entity';

import ormConfig from './ormconfig';

@Global()
@Module({
  imports: [TypeOrmModule.forRoot(ormConfig.options), TypeOrmModule.forFeature([Article, Category, Tag])]
})
export class DatabaseModule {}
