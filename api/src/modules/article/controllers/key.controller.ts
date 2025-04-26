import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateKeyDto } from 'src/modules/article/dto/article.dto';
import { AuthorizationGuard } from 'src/modules/auth0/authorization.guard';
import { Key } from 'src/modules/database/entities/key.entity';
import { DataSource } from 'typeorm';

@ApiTags('key')
@Controller('key')
export class KeyController {
  constructor(private readonly datasource: DataSource) {}

  @ApiBearerAuth('jwt')
  @UseGuards(AuthorizationGuard)
  @Post()
  async createOrUpdate(@Body() { value }: CreateKeyDto): Promise<string> {
    await this.datasource.manager.delete(Key, {});

    const key = this.datasource.manager.create(Key, { value });

    return this.datasource.manager.save(key).then(res => res.value);
  }

  @Get()
  async read(): Promise<string | null> {
    return await this.datasource.manager.find(Key, {}).then(res => res[0]?.value ?? null);
  }
}
