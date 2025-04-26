import { ConflictException, Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService as NestMailerService } from '@nestjs-modules/mailer';
import { createTransport } from 'nodemailer';
import { AppConfig } from 'src/modules/config/validation.schema';
import { User } from 'src/modules/database/entities/user.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class MailerService implements OnModuleInit {
  private logger = new Logger(MailerService.name);

  constructor(
    private readonly config: ConfigService<AppConfig, true>,
    private readonly dataSource: DataSource,
    private readonly mailerService: NestMailerService
  ) {}

  async onModuleInit(): Promise<void> {
    await this.checkMailConnection().catch(err => {
      this.logger.error(err);
    });
  }

  private async checkMailConnection(): Promise<void> {
    try {
      // Создаем временный транспорт для проверки соединения
      const transporter = createTransport({
        host: this.config.get('MAILER_HOST'),
        port: +this.config.get('MAILER_PORT'),
        auth: {
          user: this.config.get('MAILER_USERNAME'),
          pass: this.config.get('MAILER_PASSWORD')
        }
      });

      // Проверяем соединение
      await transporter.verify();
      this.logger.log('SMTP connection established successfully');
    } catch (error) {
      throw new Error(`Failed to connect to SMTP server: ${error.message}`);
    }
  }

  async userEmailGuard(email: string): Promise<boolean> {
    const user = await this.dataSource.manager.findOne(User, { where: { email } });

    return !!user;
  }

  /**
   * Отправляет новостную рассылку на указанный адрес
   */
  async sendNewsletter(
    email: string,
    subject: string,
    articles: Array<{ title: string; url: string }>,
    date: string
  ): Promise<void> {
    await this.mailerService.sendMail({
      to: email,
      subject: 'اخر الاخبار',
      template: './newsletter', // ./templates/newsletter.hbs
      context: {
        email,
        name: email.split('@')[0],
        date,
        articles,
        siteUrl: this.config.get('BASE_URL'),
        year: new Date().getFullYear().toString()
      }
    });
  }

  async subscribe(email: string): Promise<void> {
    const isExist = await this.userEmailGuard(email);

    if (!isExist) {
      // Отправляем письмо с использованием шаблона
      await this.mailerService.sendMail({
        to: email,
        subject: 'تأكيد الاشتراك في النشرة الإخبارية',
        template: './subscribe', // ./templates/subscribe.hbs
        context: {
          email,
          name: email.split('@')[0], // Упрощенный вариант для имени
          siteUrl: this.config.get('BASE_URL'),
          year: new Date().getFullYear().toString()
        }
      });

      await this.dataSource.manager.save(User, { email });
    } else throw new ConflictException('Email already exists');
  }

  async unsubscribe(email: string): Promise<void> {
    const isExist = await this.userEmailGuard(email);

    if (isExist) {
      // Отправляем письмо с использованием шаблона
      await this.mailerService.sendMail({
        to: email,
        subject: 'تأكيد إلغاء الاشتراك من النشرة الإخبارية',
        template: './unsubscribe', // ./templates/unsubscribe.hbs
        context: {
          email,
          siteUrl: this.config.get('BASE_URL'),
          year: new Date().getFullYear().toString()
        }
      });

      await this.dataSource.manager.delete(User, { email });
    } else throw new NotFoundException('Email not found');
  }
}
