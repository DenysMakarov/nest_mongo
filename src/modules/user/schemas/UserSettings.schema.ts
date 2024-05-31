import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class UserSettings {
  @ApiProperty({
    example: true,
    description: 'Whether the user receives notifications',
  })
  @Prop({ required: false, default: false })
  receiveNotifications?: boolean;

  @ApiProperty({
    example: false,
    description: 'Whether the user receives emails',
  })
  @Prop({ required: false, default: false })
  receiveEmails?: boolean;

  @ApiProperty({ example: false, description: 'Whether the user receives SMS' })
  @Prop({ required: false, default: false })
  receiveSMS?: boolean;
}

export const UserSettingsSchema = SchemaFactory.createForClass(UserSettings);
