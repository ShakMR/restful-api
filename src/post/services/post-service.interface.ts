import Post from '../model/post';
import { PostDTO } from "../controller/dto/post";

export abstract class PostServiceInterface {
  abstract getAll(search?: string): Promise<Post[]>;

  abstract getByUuid(uuid: string): Promise<Post | undefined>;

  abstract create(post: PostDTO): Promise<Post>;

  abstract update(post: Post): Promise<Post>;

  abstract delete(post: Post);
}
