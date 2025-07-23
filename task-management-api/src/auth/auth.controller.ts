
      
// import { Controller, Request, Post, UseGuards, Body, Res, Req } from '@nestjs/common';
// import { Response, Request as ExpressRequest } from 'express';
// import { AuthService } from './auth.service';
// import { JwtAuthGuard } from './jwt.strategy';
// //import { JwtAuthGuard } from './jwt-auth.guard';

// import { LocalAuthGuard } from './local-auth.guard';

// interface AuthenticatedRequest extends ExpressRequest {
//   user?: any;
// }

// @Controller('auth')
// export class AuthController {
//   constructor(private authService: AuthService) {}

//   @UseGuards(LocalAuthGuard)
//   @Post('login')
//   async login(@Request() req, @Res({ passthrough: true }) res: Response) {
//     const { access_token } = await this.authService.login(req.user);

//     res.cookie('jwt', access_token, {
//       httpOnly: true,
//       sameSite: 'none',
//       secure: true,
//       maxAge: 24 * 60 * 60 * 1000,
//     });

//     return { message: 'Login successful' };
//   }

//   @Post('signup')
//   async signup(@Body() body: { username: string; password: string }) {
//     return this.authService.signup(body.username, body.password);
//   }

//   // @UseGuards(JwtAuthGuard)
//   // @Post('profile')
//   // getProfile(@Req() req: AuthenticatedRequest) {
//   //   console.log('🍪 Cookie: ', req.cookies);
//   //   console.log('👤 User: ', req.user);
//   //   return req.user;
//    @UseGuards(JwtAuthGuard)
// @Post('profile')
// getProfile(@Req() req) {
//   return req.user; // JWT validate झाला की user info मिळते
// }

//   }


 
import { Controller, Request, Post, UseGuards, Body, Res, Req } from '@nestjs/common';
import { Response, Request as ExpressRequest } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.strategy';
import { LocalAuthGuard } from './local-auth.guard';
import { UserRole } from '../users/entities/user.entity'; // 👈 योग्य import


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
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return { message: 'Login successful' };
  }

  // @Post('signup')
  // async signup(@Body() body: { username: string; password: string }) {
  //   return this.authSservice.signup(body.username, body.password);
  // }

  @Post('signup')
    async signup(@Body() body: { username: string; password: string; role?: UserRole }) {
       return this.authService.signup(body.username, body.password, body.role);
}

    @UseGuards(JwtAuthGuard)
  @Post('profile')
    getProfile(@Req() req: AuthenticatedRequest) {
    return req.user;
  }
}
