import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Roles {
  @Prop({ required: true })
  roles: string;

  @Prop({ required: true })
  description: string;
}

export const RolesSchema = SchemaFactory.createForClass(Roles);
