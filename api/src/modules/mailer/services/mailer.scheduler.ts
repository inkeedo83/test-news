import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Article } from 'src/modules/database/entities/article.entity';
import { User } from 'src/modules/database/entities/user.entity';
import { MailerService } from 'src/modules/mailer/services/mailer.service';
import { DataSource } from 'typeorm';

@Injectable()
export class MailerScheduler {
  private logger = new Logger(MailerScheduler.name);

  constructor(
    private readonly mailerService: MailerService,
    private readonly dataSource: DataSource
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_NOON)
  async sendNews(): Promise<void> {
    this.logger.log('Starting newsletter distribution...');

    const users = await this.dataSource.manager.find(User);
    const articles = await this.dataSource.manager.find(Article, { order: { createdAt: 'DESC' }, take: 4 });

    if (!users.length || !articles.length) {
      this.logger.log('No users or articles found, skipping newsletter distribution');

      return;
    }

    this.logger.log(`Sending newsletter to ${users.length} users`);

    const now = new Date();
    const formattedDate = now.toLocaleDateString();

    // Формируем список ссылок на статьи
    const articleLinks = articles.map(article => ({
      title: article.title,
      url: `${process.env.BASE_URL}/articles/${article.id}`
    }));

    // Отправляем письма каждому пользователю
    for (const user of users)
      await this.mailerService.sendNewsletter(
        user.email,
        '', // subject теперь задается внутри mailerService
        articleLinks,
        formattedDate
      );

    this.logger.log('Newsletter distribution completed successfully');
  }
}
