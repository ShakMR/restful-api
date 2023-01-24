import Media from "../model/media";

export abstract class MediaServiceInterface {
  abstract getByPostId(postId: number): Promise<Media[]>;
}