import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Article } from 'src/modules/database/entities/article.entity';
import { User } from 'src/modules/database/entities/user.entity';
import { MailerService } from 'src/modules/mailer/services/mailer.service';
import { DataSource } from 'typeorm';

@Injectable()
export class MailerScheduler {
  constructor(
    private readonly mailerService: MailerService,
    private readonly dataSource: DataSource
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_NOON)
  async sendNews(): Promise<void> {
    const users = await this.dataSource.manager.find(User);

    const emails = users.map(user => user.email);

    const now = new Date().toISOString();
    const subject = `News at ${now}`;

    const articles = await this.dataSource.manager.find(Article, { order: { createdAt: 'DESC' }, take: 4 });

    const news = articles.map(article => `${process.env.BASE_URL}/articles/${article.id}`);

    for (const email of emails) await this.mailerService.sendMail({ receiver: email, subject, text: news.join('\n') });
  }
}
