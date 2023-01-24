import { Injectable } from '@nestjs/common';
import Media from '../../model/media';
import { MediaDTO } from '../dto/media';

@Injectable()
class MediaTransformer {
  toDTO(media: Media): MediaDTO {
    return new MediaDTO(media);
  }

  toDTOCollection(media: Media[]): MediaDTO[] {
    return media.map((m) => this.toDTO(m));
  }
}

export default MediaTransformer;