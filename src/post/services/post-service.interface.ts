import Post from '../model/post';

export abstract class PostServiceInterface {
  abstract getAll(): Promise<Post[]>;

  abstract getByUuid(uuid: string): Promise<Post | undefined>;
}
