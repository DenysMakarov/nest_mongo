import { Body, Injectable, Post } from "@nestjs/common";
// import { CreateUserDto } from "@/modules/user/dto/CreateUserDto";
import { UserService } from '@/modules/user/user.service';
import { CreateUserDto } from '@/modules/user/dto/CreateUserDto';

@Injectable()
export class AuthService {

  constructor(private UserService: UserService) {}

  async login( userDto: CreateUserDto) {

  }

  async register( userDto: CreateUserDto) {

  }
}
