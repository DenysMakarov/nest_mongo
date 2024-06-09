import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { UserSettings } from './UserSettings.schema';
import { Post } from '../../posts/schemas/Post.schema';
import { ApiProperty } from '@nestjs/swagger';
import { Roles } from '@/common/enums';

export type UserDocument = User & mongoose.Document;

@Schema()
export class User {
  @ApiProperty({ example: 'JohnDoe', description: 'The username of the user' })
  @Prop({ required: true })
  username: string;

  @ApiProperty({
    example: '[email protected]',
    description: 'The uniq email of the user',
  })
  @Prop({ unique: true, required: true })
  email: string;

  @ApiProperty({ example: 'password', description: 'The password of the user' })
  @Prop({ unique: false, required: true })
  password: string;

  @ApiProperty({ type: UserSettings, description: 'The settings of the user' })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserSettings' })
  settings?: UserSettings;

  @ApiProperty({
    example: ['ADMIN', 'VISITOR'],
    description: 'The roles of the user',
  })
  @Prop({ unique: false, default: [Roles.VISITOR] })
  roles?: string[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }] })
  posts: Post[];
}

export const UserSchema = SchemaFactory.createForClass(User);
