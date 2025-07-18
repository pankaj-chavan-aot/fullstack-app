import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express'; // ⬅️ for accessing req.cookies
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
     
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
    console.log('🧪 Incoming cookies:', req.cookies); // cookie मिळतेय का?

          return req?.cookies?.jwt || null;
          //return req?.cookies?.access_token || null;

        },
      ]),
      secretOrKey: 'jwt-secret-key', 
    });
  }

  async validate(payload: any) {
      console.log('🔐 JWT payload:', payload); // add this line

    return { id: payload.sub, username: payload.username, role: payload.role };
  }
}
