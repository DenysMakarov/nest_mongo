import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class CreateUserSettingsDto {
  @ApiProperty({
    example: true,
    description: 'Whether the user receives notifications',
  })
  @IsOptional()
  @IsBoolean()
  receiveNotifications?: boolean;

  @ApiProperty({
    example: false,
    description: 'Whether the user receives emails',
  })
  @IsOptional()
  @IsBoolean()
  receiveEmails?: boolean;

  @ApiProperty({ example: false, description: 'Whether the user receives SMS' })
  @IsOptional()
  @IsBoolean()
  receiveSMS?: boolean;
}
