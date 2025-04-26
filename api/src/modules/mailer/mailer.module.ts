import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { MailerModule as NestMailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { MailerController } from 'src/modules/mailer/controllers/mailer.controller';
import { MailerScheduler } from 'src/modules/mailer/services/mailer.scheduler';
import { MailerService } from 'src/modules/mailer/services/mailer.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    NestMailerModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        transport: {
          host: config.get('MAILER_HOST'),
          port: config.get('MAILER_PORT'),
          auth: {
            user: config.get('MAILER_USERNAME'),
            pass: config.get('MAILER_PASSWORD')
          }
        },
        defaults: {
          from: `"${config.get('MAILER_FROM_NAME') || 'مراسل بلجيكا'}" <${config.get('MAILER_USERNAME')}>`
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true
          }
        }
      }),
      inject: [ConfigService]
    })
  ],
  controllers: [MailerController],
  providers: [MailerService, MailerScheduler],
  exports: [MailerService]
})
export class MailerModule {}
