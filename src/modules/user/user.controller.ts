import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/CreateUserDto';
import mongoose from 'mongoose';
import { UpdateUserDetailDto } from './dto/UpdateUserDetailDto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import JwtAuthGuard from '@/modules/auth/jwt-auth.guard';
import { ExpressRequestInterface } from '@/types/expressRequest';
import { UserDecorator } from '@/modules/user/decorators/user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

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
  // @UseGuards(JwtAuthGuard)
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
  async getCurrentUser(
    @Req() req: ExpressRequestInterface,
    // @UserDecorator('id') user: any,
    // @UserDecorator('email') user: any,
    @UserDecorator(['id', 'email']) user: any,
  ) {
    // return req.user;
    return user; // from decorator
  }

  // @Post('image')
  // uploadFile(@UploadedFile() file) {
  //   this.userService.uploadAvatar(file);
  //   // return { message: 'File uploaded successfully!', filePath: file.path };
  // }

  @Post('image')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: (req, file, callback) => {
          console.log('Destination:', './uploads');
          callback(null, './uploads');
        },
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          console.log('Filename:', `${file.fieldname}-${uniqueSuffix}${ext}`);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        console.log('File mimetype:', file.mimetype);
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          console.log('File rejected:', file.mimetype);
          return callback(
            new BadRequestException('Only image files are allowed!'),
            false,
          );
        }
        console.log('File accepted:', file.mimetype);
        callback(null, true);
      },
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File is required');
    }
    console.log('File uploaded:', file);
    return { message: 'File uploaded successfully!', filePath: file.path };
  }
}
