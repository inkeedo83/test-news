import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { loadConfig } from './validation.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [loadConfig],
      isGlobal: true,
      cache: true,
      validate: loadConfig
    })
  ]
})
export class AppConfigModule {}
