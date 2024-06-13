import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '@/common/decorators/role-auth.decorator';
import { AuthService } from '@/modules/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
class AuthRoleGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) return true;

    const req = context.switchToHttp().getRequest();
    const token = this.authService.extractTokenFromHeader(req);

    if (!token) throw new UnauthorizedException('Token not provided');

    try {
      const user = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      req.user = user;

      if (requiredRoles && !this.hasRequiredRoles(user, requiredRoles)) {
        throw new ForbiddenException('Access denied');
      }
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }

    const user = await this.authService.validateToken(token);
    req.user = user;
    return user.roles.some((role: string) => requiredRoles.includes(role));
  }

  private hasRequiredRoles(user: any, requiredRoles: string[]): boolean {
    return requiredRoles.some((role) => user.roles.includes(role));
  }
}

export default AuthRoleGuard;
