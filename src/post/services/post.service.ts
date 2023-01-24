import { Inject, Injectable } from '@nestjs/common';
import { PostServiceInterface } from './post-service.interface';
import Post from '../model/post';
import { PostRepositoryInterface } from '../repository/post-repository.interface';
import { PostDTO } from '../controller/dto/post';
import { v4 as uuid } from 'uuid';

@Injectable()
export class PostService implements PostServiceInterface {
  constructor(
    @Inject('PostRepository') private postRepository: PostRepositoryInterface,
  ) {}

  async getAll(search?: string): Promise<Post[]> {
    const posts = await this.postRepository.find();

    if (search) {
      return posts.filter((post) => post.title.includes(search));
    }

    return posts;
  }

  getByUuid(uuid: string): Promise<Post | undefined> {
    return this.postRepository.getByUuid(uuid);
  }

  create(postDTO: PostDTO): Promise<Post> {
    const post = {
      ...postDTO,
      uuid: uuid(),
    };
    return this.postRepository.create(post);
  }

  update(post: Post): Promise<Post> {
    return this.postRepository.update(post.id, post);
  }

  delete(post: Post): Promise<void> {
    return this.postRepository.delete(post.id);
  }
}
