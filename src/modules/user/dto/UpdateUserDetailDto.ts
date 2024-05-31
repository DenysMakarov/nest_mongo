import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDetailDto {
  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  email: string;
}
