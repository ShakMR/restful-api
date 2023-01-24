import { Inject, Injectable } from '@nestjs/common';
import { GetOptions, PostServiceInterface } from './post-service.interface';
import Post from '../model/post';
import { PostRepositoryInterface } from '../repository/post-repository.interface';
import { PostDTO } from '../controller/dto/post';
import { v4 as uuid } from 'uuid';
import { MediaServiceInterface } from '../../media/services/media-service.interface';

@Injectable()
export class PostService implements PostServiceInterface {
  constructor(
    @Inject('PostRepository') private postRepository: PostRepositoryInterface,
    @Inject('MediaService') private mediaService: MediaServiceInterface,
  ) {}

  async getAll(search?: string): Promise<Post[]> {
    const posts = await this.postRepository.find();

    if (search) {
      return posts.filter((post) => post.title.includes(search));
    }

    return posts;
  }

  async getByUuid(
    uuid: string,
    options: GetOptions,
  ): Promise<Post | undefined> {
    const post = await this.postRepository.getByUuid(uuid);

    if (!post || !options.includeMedia) {
      return post;
    }

    post.media = await this.mediaService.getByPostId(post.id);

    return post;
  }

  create(postDTO: Post): Promise<Post> {
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
