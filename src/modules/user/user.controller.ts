import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
// import { ValidationPipe } from '@/common/pipes/validation.pipe';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/CreateUserDto';
import mongoose from 'mongoose';
import { UpdateUserDetailDto } from './dto/UpdateUserDetailDto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '@/modules/auth/role-auth.decorator';
import RoleGuard from '@/modules/auth/role.guard';
import JwtAuthGuard from "@/modules/auth/jwt-auth.guard";

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  // @ApiOperation({ summary: 'Create a new user' })
  // @ApiResponse({
  //   status: 201,
  //   description: 'User created successfully',
  //   type: CreateUserDto,
  // })
  // @UsePipes(new ValidationPipe())
  // @Post()
  // async registration(@Body() createUserDto: CreateUserDto) {
  //   const user = await this.userService.getUserByEmail(createUserDto.email);
  //   if (user) {
  //     throw new ConflictException('User already exists');
  //   }
  //   return this.userService.createUser(createUserDto);
  // }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Return all users',
    type: CreateUserDto,
    isArray: true,
  })
  // @Roles('ADMIN')
  // @UseGuards(RoleGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('email/:email')
  @UsePipes(new ValidationPipe())
  async getUserByEmail(@Param('email') email: string) {
    const user = await this.userService.getUserByEmail(email);
    if (!user) throw new HttpException('User not found', 404);
    return user;
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('User not found', 404);
    const user = await this.userService.getUserById(id);
    if (!user) throw new HttpException('User not found', 404);
    return user;
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async updateUser(
    @Param('id') id: string,
    @Body() UpdateUserDetailDto: UpdateUserDetailDto,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 400);
    const user = await this.userService.getUserById(id);
    if (!user) throw new HttpException('User not found', 404);
    return this.userService.updateUser(id, UpdateUserDetailDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 400);
    const deletedUser = await this.userService.deleteUser(id);
    if (!deletedUser) throw new HttpException('User not found', 404);
    return deletedUser;
  }

  @Get('current/user')
  async getCurrentUser(@Req() req: any){
    return 'current user';
  }
}
