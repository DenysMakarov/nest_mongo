import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './schemas/Post.schema';
import { CreatePostDto } from './dto/CreatePostDto';
import { User } from '../user/schemas/User.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    @InjectModel(User.name) private userModel: Model<Post>,
  ) {}

  async createPost({ userId, ...createPostDto }: CreatePostDto) {
    const findUser = await this.userModel.findById(userId);
    if (!findUser) throw new HttpException('User not found', 404);
    const newPost = new this.postModel(createPostDto);
    const savedPosts = await newPost.save();
    await findUser.updateOne({ $push: { posts: savedPosts._id } });
    return savedPosts;
  }

  getPosts() {
    return 'All posts';
  }

  getPost(id: string) {
    return `Post ${id}`;
  }

  updatePost(id: string) {
    return `Post ${id} updated`;
  }

  deletePost(id: string) {
    return `Post ${id} deleted`;
  }
}
