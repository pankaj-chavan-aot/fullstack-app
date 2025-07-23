import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRole } from '../users/entities/user.entity'; // 👈 योग्य import

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

    async validateUser(username: string, pass: string) {
    const user = await this.usersService.findByUsername(username);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...rest } = user;
      return rest;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // async signup(username: string, password: string) {
  //   const hashed = await bcrypt.hash(password, 10);
  //   try { 
  //     return await this.usersService.create({ username, password: hashed });
  //   } catch (error) {
  //     if (error.code === '23505') {
  //       throw new ConflictException('Username already exists');
  //     }
  //     throw error;
  //   }
  // }

  async signup(username: string, password: string, role: UserRole = UserRole.USER) {
  const hashed = await bcrypt.hash(password, 10);
  try {
    return await this.usersService.create({ username, password: hashed, role });
  } catch (error) {
    if (error.code === '23505') {
      throw new ConflictException('Username already exists');
    }
    throw error;
  }
}

}
