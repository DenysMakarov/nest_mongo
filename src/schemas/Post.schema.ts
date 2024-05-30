import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema()
export class Post {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' });
}

export const PostSchema = SchemaFactory.createForClass(Post);
