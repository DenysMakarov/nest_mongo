import { Types } from 'mongoose';

export interface IUser {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  settings?: Types.ObjectId;
  roles: string[];
  posts: Types.ObjectId[];
}

export type UserLogin = Pick<IUser, 'email' | 'password'>;
