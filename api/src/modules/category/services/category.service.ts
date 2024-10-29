import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PaginatedEntityDto } from 'src/common/types/types';
import { ReadCategoriesDto } from 'src/modules/category/dto/category.dto';
import { Category } from 'src/modules/database/entities/category.entity';
import { DataSource, EntityManager, FindOptionsWhere, ILike } from 'typeorm';

@Injectable()
export class CategoryService {
  private manager: EntityManager;
  constructor(private readonly dataSource: DataSource) {
    this.manager = this.dataSource.manager;
  }

  async create(name: string): Promise<Category> {
    const existCategory = await this.manager.findOne(Category, { where: { name } });

    if (existCategory) throw new BadRequestException(`Category ${name} already exists`);

    const categoryToCreate = this.manager.create(Category, { name });

    return this.manager.save(Category, categoryToCreate);
  }

  async read({ limit, offset, pattern, order }: ReadCategoriesDto): Promise<PaginatedEntityDto<Category>> {
    const criteria: FindOptionsWhere<Category> = pattern === undefined ? {} : { name: ILike(`%${pattern}%`) };

    const [categories, count] = await this.manager.findAndCount(Category, {
      where: criteria,
      take: limit ?? 100,
      skip: offset ?? 0,
      order: { createdAt: order ?? 'DESC' }
    });

    return { data: categories, count };
  }

  async readOne(id: string): Promise<Category> {
    const category = await this.manager.findOne(Category, { where: { id } });

    if (!category) throw new BadRequestException(`Category with id ${id} not found`);

    return category;
  }
  async update(id: string, name?: string): Promise<Category> {
    const category = await this.manager.findOne(Category, { where: { id } });

    if (!category) throw new NotFoundException(`Category with id ${id} not found`);
    if (name) {
      const existCategory = await this.manager.findOne(Category, { where: { name } });

      if (existCategory) throw new BadRequestException(`Category with name ${name} already exist`);
    }

    category.name = name ?? category.name;

    return this.manager.save(Category, category);
  }

  async delete(id: string): Promise<Category> {
    const category = await this.manager.findOne(Category, { where: { id } });

    if (!category) throw new BadRequestException(`Category with id ${id} not found`);

    await this.manager.remove(category);

    return category;
  }
}
