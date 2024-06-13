import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserSettings } from '../schemas/UserSettings.schema';
import { CreateUserSettingsDto } from '@/modules/user/dto/CreateSettingsDto';

export class CreateUserDto {
  @ApiProperty({ example: 'JohnDoe', description: 'The username of the user' })
  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  username: string;

  @ApiProperty({
    example: 'email@gmail.com',
    description: 'The uniq email of the user',
  })
  @IsNotEmpty()
  @IsString({ message: 'Invalid email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password', description: 'The password of the user' })
  @IsNotEmpty()
  @IsString()
  @Length(6, 16, { message: 'Password must be between 6 and 16 characters' })
  password: string;

  @ApiProperty({
    example: ['ADMIN', 'VISITOR'],
    description: 'The roles of the user',
  })
  @IsOptional()
  @IsArray()
  roles?: string[];

  @ApiProperty({ type: UserSettings, description: 'The settings of the user' })
  @IsOptional()
  @ValidateNested()
  settings?: CreateUserSettingsDto;
}
