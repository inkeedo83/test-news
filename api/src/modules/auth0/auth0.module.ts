import { Module } from '@nestjs/common';
import { JwtStrategy } from 'src/modules/auth0/auth0.guard';

@Module({
  providers: [JwtStrategy]
})
export class Auth0Module {}
