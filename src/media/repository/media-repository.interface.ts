import Media from '../model/media';

export type FindOptions = {
  postId: number;
};

export abstract class MediaRepositoryInterface {
  abstract create(media: Media): Promise<Media>;

  abstract find(options: FindOptions): Promise<Media[]>;

  abstract delete(id: number): Promise<void>;
}
