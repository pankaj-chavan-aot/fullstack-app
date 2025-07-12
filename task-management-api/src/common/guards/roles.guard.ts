// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}
//   canActivate(ctx: ExecutionContext): boolean {
//     const req = ctx.switchToHttp().getRequest();
//     const user = req.user;
//     const required = this.reflector.get<UserRole>('role', ctx.getHandler());
//     return !required || user.role === required;
//   }
// }
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const required = this.reflector.get<string>('role', ctx.getHandler());
    const { user } = ctx.switchToHttp().getRequest();
    if (!required) return true;
    return user?.role === required;
  }
}
