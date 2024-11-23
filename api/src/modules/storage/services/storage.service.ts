import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MinioService } from 'nestjs-minio-client';
import { AppConfig } from 'src/modules/config/validation.schema';
import { Readable } from 'stream';

export const ALLOWED_FILES_TYPES = ['jpg', 'jpeg', 'bmp', 'png'] as const;

@Injectable()
export class StorageService implements OnModuleInit {
  private readonly logger = new Logger(StorageService.name);

  constructor(
    private readonly minioService: MinioService,
    private readonly config: ConfigService<AppConfig, true>
  ) {}
  async onModuleInit(): Promise<void> {
    await this.createBucket().catch(e => {
      this.logger.debug(`MinIO connection error: ${e}`);
    });
  }

  async createBucket(bucket: string = this.config.get('MINIO_BUCKET')): Promise<void> {
    const existBucket = await this.minioService.client.bucketExists(bucket);

    if (!existBucket) await this.minioService.client.makeBucket(bucket, 'us-east-1', { ObjectLocking: false });
    this.logger.debug(`Bucket ${bucket} ready to use!`);
  }

  getFilenames2(bucket: string = this.config.get('MINIO_BUCKET')): Promise<string[]> {
    const stream = this.minioService.client.listObjects(bucket, '', true);

    return new Promise((resolve, reject) => {
      const fileNames: string[] = [];

      stream.on('data', file => {
        if (file.name && ALLOWED_FILES_TYPES.some(type => file.name.endsWith(type))) fileNames.push(file.name);
      });
      stream.on('error', err => reject(err));
      stream.on('end', () => resolve(fileNames));
    });
  }
  getFilenames(bucket: string = this.config.get('MINIO_BUCKET')): Promise<string[]> {
    const stream = this.minioService.client.listObjects(bucket, '', true);

    return new Promise((resolve, reject) => {
      const fileNames: string[] = [];

      stream.on('data', file => {
        if (file.name) fileNames.push(file.name);
      });
      stream.on('error', err => reject(err));
      stream.on('end', () => resolve(fileNames));
    });
  }

  async uploadFile(
    filename: string,
    fileData: Buffer,
    bucket: string = this.config.get('MINIO_BUCKET')
  ): Promise<boolean> {
    const res = await this.minioService.client.putObject(bucket, filename, fileData).catch(err => {
      throw new Error(err);
    });

    return !!res;
  }

  async deleteFile(filename: string, bucket: string = this.config.get('MINIO_BUCKET')): Promise<void> {
    await this.minioService.client.removeObject(bucket, filename).catch(err => {
      throw new Error(err);
    });
  }

  async getFileBuffer(filename: string, bucket: string = this.config.get('MINIO_BUCKET')): Promise<Buffer> {
    const res = await this.minioService.client.getObject(bucket, filename).catch(err => {
      throw new Error(err);
    });

    return streamToBuffer(res);
  }

  async getFileStream(filename: string, bucket: string = this.config.get('MINIO_BUCKET')): Promise<Readable> {
    return this.minioService.client.getObject(bucket, filename).catch(err => {
      throw new Error(err);
    });
  }
  async _fileUrl(filename: string, bucket: string = this.config.get('MINIO_BUCKET')): Promise<string> {
    const minioUrl =
      this.config.get('NODE_ENV') === 'production'
        ? this.config.get('MINIO_HOST')
        : `${this.config.get('MINIO_HOST')}:${this.config.get('MINIO_PORT')}`;

    return `${minioUrl}/${bucket}/${filename}`;
  }

  async fileUrl(filename: string, bucket: string = this.config.get('MINIO_BUCKET')): Promise<string> {
    return this.minioService.client.presignedGetObject(bucket, filename, 12 * 60 * 60);
  }
}

function streamToBuffer(stream: Readable): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];

    stream.on('data', chunk => chunks.push(chunk));
    stream.on('error', err => reject(err));
    stream.on('end', () => resolve(Buffer.concat(chunks)));
  });
}
