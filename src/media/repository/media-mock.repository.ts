import { Injectable } from '@nestjs/common';
import {
  FindOptions,
  MediaRepositoryInterface,
} from './media-repository.interface';
import Media from '../model/media';

const mockedMedia: Media[] = [
  {
    id: 1,
    uuid: '00000000-0000-0000-1111-000000000001',
    post: 1,
    src: 'http://example/nigeria.png',
  },
  {
    id: 2,
    uuid: '00000000-0000-0000-1111-000000000002',
    post: 2,
    src: 'http://example/peru.png',
  },
  {
    id: 3,
    uuid: '00000000-0000-0000-1111-000000000003',
    post: 3,
    src: 'http://example/moon.png',
  },
  {
    id: 4,
    uuid: '00000000-0000-0000-1111-000000000004',
    post: 4,
    src: 'http://example/flat.png',
  },
  {
    id: 5,
    uuid: '00000000-0000-0000-1111-000000000005',
    post: 5,
    src: 'http://example/animals.png',
  },
  {
    id: 6,
    uuid: '00000000-0000-0000-1111-000000000006',
    post: 1,
    src: 'http://example/kenya.png',
  },
];

@Injectable()
export class MediaMockRepository implements MediaRepositoryInterface {
  async find({ postId }: FindOptions): Promise<Media[]> {
    if (!postId) {
      return mockedMedia;
    }

    return mockedMedia.filter((m) => m.post === postId);
  }

  async create(media: Media): Promise<Media> {
    const lastId = mockedMedia[mockedMedia.length - 1].id;
    media.id = lastId + 1;
    mockedMedia.push(media);
    return media;
  }

  async delete(id: number): Promise<void> {
    const position = mockedMedia.findIndex((m) => m.id === id);
    mockedMedia.splice(position, 1);
  }
}
