import { Module } from '@nestjs/common';
import { MailerController } from 'src/modules/mailer/controllers/mailer.controller';
import { MailerScheduler } from 'src/modules/mailer/services/mailer.scheduler';
import { MailerService } from 'src/modules/mailer/services/mailer.service';

@Module({
  controllers: [MailerController],
  providers: [MailerService, MailerScheduler]
})
export class MailerModule {}
