import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDetail {
  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  email: string;
}
