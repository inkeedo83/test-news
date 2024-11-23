import { Controller, Get, NotFoundException, Param, Response } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response as ExpressResponse } from 'express';
import { Article } from 'src/modules/database/entities/article.entity';
import { StorageService } from 'src/modules/storage/services/storage.service';
import { DataSource, EntityManager } from 'typeorm';

@ApiTags('Image proxy')
@Controller('image')
export class ProxyController {
  private manager: EntityManager;
  constructor(
    private readonly storageService: StorageService,
    private readonly dataSource: DataSource
  ) {
    this.manager = this.dataSource.manager;
  }

  @Get(':filename')
  async fetchImage(@Param('filename') filename: string, @Response() res: ExpressResponse): Promise<void> {
    const article = await this.manager.findOne(Article, { where: { image: filename } });

    if (!article) throw new NotFoundException(`Image ${filename} not found`);
    const stream = await this.storageService.getFileStream(filename);

    stream.pipe(res);
  }
}
