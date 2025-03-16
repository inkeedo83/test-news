// src/auth/auth0.guard.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { expressJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AppConfig } from 'src/modules/config/validation.schema';

@Injectable()
export class Auth0Guard extends AuthGuard('jwt') {}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService<AppConfig, true>) {
    super({
      secretOrKeyProvider: expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${configService.get('AUTH0_DOMAIN')}/.well-known/jwks.json`
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: configService.get('AUTH0_AUDIENCE'),
      issuer: `https://${configService.get('AUTH0_DOMAIN')}/`,
      algorithms: ['RS256']
    });
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async validate(payload) {
    // Payload contains user information from the JWT token
    return { userId: payload.sub, email: payload.email };
  }
}
