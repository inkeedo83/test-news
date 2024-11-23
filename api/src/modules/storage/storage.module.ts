import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MinioModule } from 'nestjs-minio-client';
import { AppConfig } from 'src/modules/config/validation.schema';
import { StorageService } from 'src/modules/storage/services/storage.service';

@Module({
  imports: [
    MinioModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService<AppConfig, true>) => {
        return {
          endPoint: config.get('MINIO_HOST'),
          port: config.get('MINIO_USE_SSL') ? undefined : parseInt(config.get('MINIO_PORT')),
          useSSL: config.get('MINIO_USE_SSL'),
          accessKey: config.get('MINIO_USER'),
          secretKey: config.get('MINIO_PASSWORD')
        };
      }
    })
  ],
  providers: [StorageService],
  exports: [StorageService]
})
export class StorageModule {}
