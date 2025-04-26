import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from 'src/modules/database/entities/article.entity';
import { Key } from 'src/modules/database/entities/key.entity';
import { Tag } from 'src/modules/database/entities/tag.entity';
import { User } from 'src/modules/database/entities/user.entity';

import ormConfig from './ormconfig';

@Global()
@Module({
  imports: [TypeOrmModule.forRoot(ormConfig.options), TypeOrmModule.forFeature([Article, Tag, Key, User])]
})
export class DatabaseModule {}
