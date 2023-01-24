import { Inject, Injectable } from '@nestjs/common';
import { MediaServiceInterface } from './media-service.interface';
import Media from '../model/media';
import { MediaRepositoryInterface } from '../repository/media-repository.interface';

@Injectable()
export class MediaService implements MediaServiceInterface {
  constructor(
    @Inject('MediaRepository') private repository: MediaRepositoryInterface,
  ) {}

  getByPostId(postId: number): Promise<Media[]> {
    return this.repository.find({ postId });
  }
}
