import { Injectable } from '@nestjs/common';
import { PostRepositoryInterface } from './post-repository.interface';
import Post from '../model/post';

const mockedPosts: Post[] = [
  {
    id: 1,
    uuid: '00000000-0000-0000-0000-000000000001',
    title: 'Travel through Africa',
    description: 'This is my post about my trip to Africa',
  },
  {
    id: 2,
    uuid: '00000000-0000-0000-0000-000000000002',
    title: 'Travel through South America',
    description: 'This are my pics from my trip to South America',
  },
  {
    id: 3,
    uuid: '00000000-0000-0000-0000-000000000003',
    title: 'Travel to the Moon',
    description: 'This are my pics from my space trip',
  },
  {
    id: 4,
    uuid: '00000000-0000-0000-0000-000000000004',
    title: 'Walking around home',
    description: 'I took some pictures around my apartment',
  },
  {
    id: 5,
    uuid: '00000000-0000-0000-0000-000000000005',
    title: 'Animals',
    description: 'Some random animals',
  },
];

@Injectable()
export class PostMockRepository implements PostRepositoryInterface {
  async find(): Promise<Post[]> {
    return mockedPosts;
  }

  async getByUuid(uuid: string): Promise<Post | undefined> {
    return mockedPosts.filter((post) => post.uuid === uuid)[0];
  }

  async create(post: Post): Promise<Post> {
    const lastId = mockedPosts[mockedPosts.length - 1].id;
    post.id = lastId + 1;
    mockedPosts.push(post);
    return post;
  }
}
