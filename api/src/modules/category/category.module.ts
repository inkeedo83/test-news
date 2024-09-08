import { Module } from '@nestjs/common';
import { CategoryController } from 'src/modules/category/controllers/category.controller';
import { CategoryService } from 'src/modules/category/services/category.service';

@Module({
  imports: [],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}
