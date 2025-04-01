import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  OnModuleInit
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import to from 'await-to-js';
import { createTransport, Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { AppConfig } from 'src/modules/config/validation.schema';
import { User } from 'src/modules/database/entities/user.entity';
import { DataSource } from 'typeorm';

export type SendEmailParams = { receiver: string; subject: string; text: string };

@Injectable()
export class MailerService implements OnModuleInit {
  private logger = new Logger(MailerService.name);
  constructor(
    private readonly config: ConfigService<AppConfig, true>,
    private readonly dataSource: DataSource
  ) {}
  async onModuleInit(): Promise<void> {
    await this.checkMailConnection().catch(err => {
      this.logger.error(err);
    });
  }

  private async checkMailConnection(): Promise<void> {
    const transporter = this.transporter();
    const [checkErr, res] = await to<boolean>(transporter.verify());

    transporter.close();

    if (checkErr !== null || res === undefined || !res)
      throw new Error(checkErr?.message ?? 'Failed to connect to the SMTP server');
  }

  private transporter(): Transporter<SMTPTransport.SentMessageInfo, SMTPTransport.Options> {
    return createTransport({
      host: this.config.get('MAILER_HOST'),
      port: this.config.get('MAILER_PORT'),
      auth: {
        user: this.config.get('MAILER_USERNAME'),
        pass: this.config.get('MAILER_PASSWORD')
      }
    });
  }

  async sendMail({ receiver, subject, text }: SendEmailParams): Promise<void> {
    const transporter = this.transporter();

    const [err, info] = await to(
      transporter.sendMail({
        from: this.config.get('MAILER_USERNAME'),
        to: receiver,
        subject,
        text
      })
    );

    transporter.close();

    if (err !== null || info === undefined)
      throw new InternalServerErrorException(`${err?.message ?? 'Unknown error while sending email.'}`);
  }

  async userEmailGuard(email: string): Promise<boolean> {
    const user = await this.dataSource.manager.findOne(User, { where: { email } });

    return !!user;
  }

  async subscribe(email: string): Promise<void> {
    const isExist = await this.userEmailGuard(email);

    if (!isExist) {
      await this.sendMail({
        receiver: email,
        subject: 'Subscribe to our newsletter',
        text: 'Thank you for subscribing to our newsletter.'
      });
      await this.dataSource.manager.save(User, { email });
    } else throw new ConflictException('Email already exist');
  }

  async unsubscribe(email: string): Promise<void> {
    const isExist = await this.userEmailGuard(email);

    if (isExist) {
      await this.sendMail({
        receiver: email,
        subject: 'Unsubscribe from our newsletter',
        text: 'You have been unsubscribed from our newsletter.'
      });

      await this.dataSource.manager.delete(User, { email });
    } else throw new NotFoundException('Email not found');
  }
}
