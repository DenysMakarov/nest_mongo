import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/CreateUserDto';
import mongoose from 'mongoose';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import AuthRoleGuard from '@/common/guards/auth-role.guard';
import { Roles } from '@/common/decorators/role-auth.decorator';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Return all users',
    type: CreateUserDto,
    isArray: true,
  })
  // @UseGuards(AuthGuard, RoleGuard)
  @UseGuards(AuthRoleGuard)
  @Roles('ADMIN')
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

  // @Patch(':id')
  // @UsePipes(new ValidationPipe())
  // async updateUser(
  //   @Param('id') id: string,
  //   @Body() UpdateUserDetailDto: UpdateUserDetailDto,
  // ) {
  //   const isValid = mongoose.Types.ObjectId.isValid(id);
  //   if (!isValid) throw new HttpException('Invalid ID', 400);
  //   const user = await this.userService.getUserById(id);
  //   if (!user) throw new HttpException('User not found', 404);
  //   return this.userService.updateUser(id, UpdateUserDetailDto);
  // }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 400);
    const deletedUser = await this.userService.deleteUser(id);
    if (!deletedUser) throw new HttpException('User not found', 404);
    return deletedUser;
  }

  // @Post('image')
  // @UseInterceptors(
  //   FileInterceptor('image', {
  //     storage: diskStorage({
  //       destination: (req, file, callback) => {
  //         console.log('Destination:', './uploads');
  //         callback(null, './uploads');
  //       },
  //       filename: (req, file, callback) => {
  //         const uniqueSuffix =
  //           Date.now() + '-' + Math.round(Math.random() * 1e9);
  //         const ext = extname(file.originalname);
  //         console.log('Filename:', `${file.fieldname}-${uniqueSuffix}${ext}`);
  //         callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  //       },
  //     }),
  //     fileFilter: (req, file, callback) => {
  //       console.log('File mimetype:', file.mimetype);
  //       if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
  //         console.log('File rejected:', file.mimetype);
  //         return callback(
  //           new BadRequestException('Only image files are allowed!'),
  //           false,
  //         );
  //       }
  //       console.log('File accepted:', file.mimetype);
  //       callback(null, true);
  //     },
  //   }),
  // )
  // uploadFile(@UploadedFile() file: Express.Multer.File) {
  //   if (!file) {
  //     throw new BadRequestException('File is required');
  //   }
  //   console.log('File uploaded:', file);
  //   return { message: 'File uploaded successfully!', filePath: file.path };
  // }
}
