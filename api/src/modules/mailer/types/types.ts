import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class EmailSubscription {
  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsEmail()
  email: string;
}
