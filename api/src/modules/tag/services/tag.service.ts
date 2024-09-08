import { BadRequestException, Injectable } from '@nestjs/common';
import { PaginatedEntityDto } from 'src/common/types/types';
import { Tag } from 'src/modules/database/entities/tag.entity';
import { ReadTagsDto } from 'src/modules/tag/dto/tag.dto';
import { DataSource, EntityManager, FindOptionsWhere, ILike } from 'typeorm';

@Injectable()
export class TagService {
  private manager: EntityManager;
  constructor(private readonly dataSource: DataSource) {
    this.manager = this.dataSource.manager;
  }

  async create(name: string): Promise<Tag> {
    const existTag = await this.manager.findOne(Tag, { where: { name } });

    if (existTag) throw new BadRequestException(`Tag ${name} already exists`);

    const tagToCreate = this.manager.create(Tag, { name });

    return this.manager.save(Tag, tagToCreate);
  }

  async read({ limit, offset, pattern, order }: ReadTagsDto): Promise<PaginatedEntityDto<Tag>> {
    const criteria: FindOptionsWhere<Tag> = pattern === undefined ? {} : { name: ILike(`%${pattern}%`) };

    const [tags, count] = await this.manager.findAndCount(Tag, {
      where: criteria,
      take: limit ?? 100,
      skip: offset ?? 0,
      order: { createdAt: order ?? 'DESC' }
    });

    return { data: tags, count };
  }

  async delete(id: string): Promise<Tag> {
    const tag = await this.manager.findOne(Tag, { where: { id } });

    if (!tag) throw new BadRequestException(`Tag with id ${id} not found`);

    await this.manager.remove(tag);

    return tag;
  }
}
