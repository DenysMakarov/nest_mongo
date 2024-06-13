import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/User.schema';
import { CreateUserDto } from './dto/CreateUserDto';
import { UpdateUserDetailDto } from './dto/UpdateUserDetailDto';
import { UserSettings } from './schemas/UserSettings.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(UserSettings.name)
    private userSettingsModel: Model<UserSettings>,
  ) {}

  async createUser({ settings, ...createUserDto }: CreateUserDto) {
    if (settings) {
      const newSettings = new this.userSettingsModel(settings);
      const savedNewSettings = await newSettings.save();
      const newUser = new this.userModel({
        ...createUserDto,
        settings: settings ? savedNewSettings._id : null,
      });
      return newUser.save();
    }
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  getUserByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  getAllUsers() {
    return this.userModel.find().populate(['settings']);
    // return this.userModel.find().populate(['settings', 'posts']);
  }

  getUserById(id: string) {
    return this.userModel.findById(id).populate(['settings', 'posts']);
  }

  // updateUser(id: string, UpdateUserDetailDto: UpdateUserDetailDto) {
  //   return this.userModel.findByIdAndUpdate(id, UpdateUserDetailDto, {
  //     new: true,
  //   });
  // }

  deleteUser(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }

  // async uploadAvatar(file: any) {
  //   const fileName = this.fileService.createFile(file);
  //   console.log('fileName', fileName);
  // }
}
