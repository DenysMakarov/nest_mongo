// src/modules/auth/auth.module.ts
import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '@/modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    forwardRef(() => UserModule), // (1)
    JwtModule.register({
      global: true, // ???
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
