import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

@Injectable()
export class CategoryService {
  private manager: EntityManager;
  constructor(private readonly dataSource: DataSource) {
    this.manager = this.dataSource.manager;
  }

  // async create(name: string): Promise<Category> {
  //   const existCategory = await this.manager.findOne(Category, { where: { name } });

  //   if (existCategory) throw new BadRequestException(`Category ${name} already exists`);

  //   const categoryToCreate = this.manager.create(Category, { name });

  //   return this.manager.save(Category, categoryToCreate);
  // }

  async read(): Promise<Category[]> {
    return categories;
  }

  // async update(id: string, name?: string): Promise<Category> {
  //   const category = await this.manager.findOne(Category, { where: { id } });

  //   if (!category) throw new NotFoundException(`Category with id ${id} not found`);
  //   if (name) {
  //     const existCategory = await this.manager.findOne(Category, { where: { name } });

  //     if (existCategory) throw new BadRequestException(`Category with name ${name} already exist`);
  //   }

  //   category.name = name ?? category.name;

  //   return this.manager.save(Category, category);
  // }

  // async delete(id: string): Promise<Category> {
  //   const category = await this.manager.findOne(Category, { where: { id } });

  //   if (!category) throw new BadRequestException(`Category with id ${id} not found`);

  //   await this.manager.remove(category);

  //   return category;
  // }
}

const categories: Category[] = [
  'BRUSSELS',
  'ANTWERP',
  'LIEGE',
  'FLANDERS',
  'WALLONIA',
  'GERMANOPHONE',
  'LAW',
  'POLITIC',
  'ECONOMIC',
  'ACCIDENT',
  'CULTURE'
];

export const CATEGORIES = [
  'BRUSSELS',
  'ANTWERP',
  'LIEGE',
  'FLANDERS',
  'WALLONIA',
  'GERMANOPHONE',
  'LAW',
  'ECONOMIC',
  'POLITIC',
  'ACCIDENT',
  'CULTURE',
  'HEALTH',
  'EDUCATION',
  'ARAB_COMMUNITY_NEWS',
  'LOCAL_EVENTS'
] as const;

export type Category = (typeof CATEGORIES)[number];

// const categoryMap = {
//   politic: '8bdf38dd-71cc-4943-a512-44b6e97142b7',

//   brussels: 'ce52b8e2-c035-4dc6-bd1f-9a9a76077cb0',

//   antwerp: 'efa8b80b-1dbf-4adb-928c-cbb934a1bf37',

//   flanders: '7d16c9ff-2c8c-4b7c-aa6f-71c5f8245f03',

//   wallonia: '9f001b4b-86ab-4449-a3d6-4097d417d044',

//   germanophone: 'af5eeb91-f5e2-4bc4-af6b-fa0d151f3c2b',

//   law: 'ca1ad4cb-d0f1-4262-9104-4e34a9cba73a',

//   economic: '8cbbd540-da01-4af0-acfb-708cb6b105aa',

//   incident: '3c44180e-0adf-45a0-b7f4-96c42035645d'
// };
