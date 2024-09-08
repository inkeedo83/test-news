import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { stdTimeFunctions } from 'pino';
import { AppConfig } from 'src/modules/config/validation.schema';
import { preparePinoMultistream } from 'src/modules/logger/functions';

@Module({
  imports: [
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService<AppConfig, true>) => ({
        pinoHttp: [
          {
            level: configService.get('ENABLE_LOGGER') ? 'debug' : 'info',
            redact: ['req.headers.cookie', 'req.headers.authorization'],
            timestamp: stdTimeFunctions.isoTime
          },
          preparePinoMultistream(configService.get('ENABLE_LOGGER'))
        ]
      })
    })
  ]
})
export class AppLoggerModule {}
