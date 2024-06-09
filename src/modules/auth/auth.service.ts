import {
  ConflictException,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '@/modules/user/user.service';
import { CreateUserDto } from '@/modules/user/dto/CreateUserDto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserDocument } from '@/modules/user/schemas/User.schema';
import { UserLogin } from '@/modules/user/interfaces';

@Injectable()
export class AuthService {
  constructor(
    private UserService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: UserLogin) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async register(userDto: CreateUserDto) {
    const candidate = await this.UserService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new ConflictException('User already exists');
    }

    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.UserService.createUser({
      ...userDto,
      password: hashPassword,
    });
    return this.generateToken(user);
  }

  private async generateToken(user: UserDocument) {
    const payload = {
      email: user.email,
      id: user._id,
      roles: user.roles,
      name: user.username,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: UserLogin) {
    const user = await this.UserService.getUserByEmail(userDto.email);
    if (!user) throw new HttpException('User not found', 404);
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({ message: 'Incorrect email or password' });
  }
}
