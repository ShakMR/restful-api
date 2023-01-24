import { Inject, Injectable } from "@nestjs/common";
import { PostServiceInterface } from './post-service.interface';
import Post from '../model/post';
import { PostRepositoryInterface } from '../repository/post-repository.interface';

@Injectable()
export class PostService implements PostServiceInterface {
  constructor(
    @Inject('PostRepository') private postRepository: PostRepositoryInterface,
  ) {}

  getAll(): Promise<Post[]> {
    return this.postRepository.find();
  }

  getByUuid(uuid: string): Promise<Post | undefined> {
    return this.postRepository.getByUuid(uuid);
  }
}
