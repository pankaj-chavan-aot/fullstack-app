

 
// import { Controller, Request, Post, UseGuards, Body, Res, Req } from '@nestjs/common';
// import { Response, Request as ExpressRequest } from 'express';
// import { AuthService } from './auth.service';
// import { JwtAuthGuard } from './jwt.strategy';
// import { LocalAuthGuard } from './local-auth.guard';
// import { UserRole } from '../users/entities/user.entity'; // 👈 योग्य import


// interface AuthenticatedRequest extends ExpressRequest {
//   user?: any;
// }

// @Controller('auth')
// export class AuthController {
//   constructor(private authService: AuthService) {}

//   @UseGuards(LocalAuthGuard)
//    @Post('login')
//   async login(@Request() req, @Res({ passthrough: true }) res: Response) {
//     const { access_token } = await this.authService.login(req.user);

//     res.cookie('jwt', access_token, {
//       httpOnly: true,
//       sameSite: 'none',
//         secure: process.env.NODE_ENV === 'production', // 🔐 secure=true only in production

//      // secure: true,
//       maxAge: 24 * 60 * 60 * 1000,
//     });

//     return { message: 'Login successful' };
//   }

//   // @Post('signup')
//   // async signup(@Body() body: { username: string; password: string }) {
//   //   return this.authSservice.signup(body.username, body.password);
//   // }

//   @Post('signup')
//     async signup(@Body() body: { username: string; password: string; role?: UserRole }) {
//        return this.authService.signup(body.username, body.password, body.role);
// }

//     @UseGuards(JwtAuthGuard)
//   @Post('profile')
//     getProfile(@Req() req: AuthenticatedRequest) {
//     return req.user;
//   }
// }

import { Controller, Request, Post, UseGuards, Body, Res, Req } from '@nestjs/common';
import { Response, Request as ExpressRequest } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.strategy';
import { LocalAuthGuard } from './local-auth.guard';
import { UserRole } from '../users/entities/user.entity';

interface AuthenticatedRequest extends ExpressRequest {
  user?: any;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res({ passthrough: true }) res: Response) {
    const { access_token } = await this.authService.login(req.user);

    res.cookie('jwt', access_token, {
      httpOnly: true,
      sameSite: 'none',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000,
    });

    return { message: 'Login successful' };
  }

  @Post('signup')
  async signup(@Body() body: { username: string; password: string; role?: UserRole }) {
    return this.authService.signup(body.username, body.password, body.role);
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  getProfile(@Req() req: AuthenticatedRequest) {
    return req.user;
  }

  // ✅ Logout route added
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'none',
      secure: process.env.NODE_ENV === 'production',
    });
    return { message: 'Logout successful' };
  }
}
