import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      request.user = payload;
    } catch (e) {
      throw new UnauthorizedException();
    }

    return true;
    /*
    from video lesson 3 years ago
     */
    // const req = context.switchToHttp().getRequest();
    // const t = this.extractTokenFromHeader(req);
    // console.log('Token:', t);
    // try {
    //   const token = req.headers.authorization.split(' ')[1];
    //   const bearer = req.headers.authorization.split(' ')[0];
    //
    //   if (bearer !== 'Bearer' || !token) {
    //     throw new UnauthorizedException({ message: 'User not authorized' });
    //   }
    //
    //   const user = this.jwtService.verify(token);
    //   req.user = user;
    //   return true;
    // } catch (e) {
    //   throw new UnauthorizedException({ message: 'User not authorized' });
    // }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

export default JwtAuthGuard;
