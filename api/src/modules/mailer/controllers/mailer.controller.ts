import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';
import { MailerService } from 'src/modules/mailer/services/mailer.service';
import { EmailSubscription } from 'src/modules/mailer/types/types';

@ApiTags('subscription')
@Controller('public')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Post('subscribe')
  @ApiOperation({ summary: 'Subscribe to newsletter' })
  @ApiOkResponse({ status: 200, description: 'Successfully subscribed' })
  @ApiConflictResponse({ status: 409, description: 'Email is already subscribed' })
  @ApiInternalServerErrorResponse({ status: 500, description: 'Failed to connect to the SMTP server' })
  async subscribe(@Body() { email }: EmailSubscription): Promise<void> {
    return this.mailerService.subscribe(email);
  }

  @Post('unsubscribe')
  @ApiOperation({ summary: 'Unsubscribe from newsletter' })
  @ApiOkResponse({ status: 200, description: 'Successfully unsubscribed' })
  @ApiInternalServerErrorResponse({ status: 500, description: 'Failed to connect to the SMTP server' })
  async unsubscribe(@Body() { email }: EmailSubscription): Promise<void> {
    return this.mailerService.unsubscribe(email);
  }
}
