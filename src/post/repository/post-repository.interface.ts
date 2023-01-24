import Post from '../model/post';

export abstract class PostRepositoryInterface {
  abstract find(): Promise<Post[]>;

  abstract getByUuid(uuid: string): Promise<Post | undefined>;

  abstract create(post: Post): Promise<Post>;
}
