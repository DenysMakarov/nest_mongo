import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from '@/modules/auth/auth.service';
import { CreateUserDto } from '@/modules/user/dto/CreateUserDto';
import { UserLogin } from '@/common/types/user.interfaces';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() userDto: UserLogin) {
    return this.authService.login(userDto);
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  register(@Body() userDto: CreateUserDto) {
    return this.authService.register(userDto);
  }
}
