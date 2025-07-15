// src/users/users.controller.ts
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt.strategy';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  
  @Get('me')
  async getProfile(@Req() req) {
    return this.usersService.findById(req.user.id);
  }
}
