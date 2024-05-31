import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '@/modules/auth/auth.service';
import { CreateUserDto } from '@/modules/user/dto/CreateUserDto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @Post('login')
  // login(@Body() userDto: CreateUserDto) {
  //   return this.authService.login(userDto)
  // }
  //
  // @Post('register')
  // register(@Body() userDto: CreateUserDto) {
  //   return this.authService.register(userDto)
  // }
}
