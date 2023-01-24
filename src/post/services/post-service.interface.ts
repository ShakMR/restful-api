import Post from '../model/post';
import { PostDTO } from '../controller/dto/post';

export type GetOptions = {
  includeMedia: boolean;
};

export type GetAllOptions = GetOptions & {
  search?: string;
};

export abstract class PostServiceInterface {
  abstract getAll(options: GetAllOptions): Promise<Post[]>;

  abstract getByUuid(
    uuid: string,
    options: GetOptions,
  ): Promise<Post | undefined>;

  abstract create(post: PostDTO): Promise<Post>;

  abstract update(post: Post): Promise<Post>;

  abstract delete(post: Post);
}
