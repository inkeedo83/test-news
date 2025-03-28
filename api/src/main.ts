import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import { AppModule } from 'src/app.module';
import { AppConfig } from 'src/modules/config/validation.schema';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { cors: true });
  const config = app.get<ConfigService<AppConfig, true>>(ConfigService);
  const logger = app.get<Logger>(Logger);
  const port = config.get('APPLICATION_PORT', { infer: true });

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      validateCustomDecorators: true
    })
  );
  const swaggerConfig = new DocumentBuilder()
    .setTitle('News')
    .setDescription('The News API description')
    .setVersion('2.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'jwt')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api/swagger', app, document);
  await app.listen(port);
  logger.log(`⚡️ Application started successfully on port ${port}`);
}

bootstrap();
