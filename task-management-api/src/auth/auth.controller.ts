// // src/auth/auth.controller.ts
// import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
// import { AuthService } from './auth.service';
// //import { LocalAuthGuard } from './local.strategy';
// import { JwtAuthGuard } from './jwt.strategy';
// import { LocalAuthGuard } from './local-auth.guard';



// @Controller('auth')
// export class AuthController {
//   constructor(private authService: AuthService) {}

//   @UseGuards(LocalAuthGuard)
//   @Post('login')  
//   async login(@Request() req) {
//     return this.authService.login(req.user);
//   }

//   @Post('signup')
//   async signup(@Body() body: { username: string; password: string }) {
//     return this.authService.signup(body.username, body.password);
//   }

//   @UseGuards(JwtAuthGuard)
//   @Post('profile')
//   getProfile(@Request() req) {
//     return req.user;
//   }
// }
      
import { Controller, Request, Post, UseGuards, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.strategy';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res({ passthrough: true }) res: Response) {
    const { access_token } = await this.authService.login(req.user);
    
    // Cookie सेट करणे:
    res.cookie('jwt', access_token, {
      httpOnly: true,
       sameSite: 'none',   // ✅ Cross-site cookie साठी 'none' लागतो
      secure: true
  });

    return { message: 'Login successful' };
  }

  @Post('signup')
  async signup(@Body() body: { username: string; password: string }) {
    return this.authService.signup(body.username, body.password);
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  getProfile(@Request() req) {
     console.log('🍪 Cookie: ', req.cookies); // ✅ हे check कर
  console.log('👤 User: ', req.user); // ✅ हे check कर
    return req.user;
  } 
}
