import { Module } from '@nestjs/common';
import { PostService } from './services/post.service';
import { PostMockRepository } from './repository/post-mock.repository';
import { PostController } from './controller/post.controller';

@Module({
  providers: [
    {
      provide: 'PostRepository',
      useClass: PostMockRepository,
    },
    {
      provide: 'PostService',
      useClass: PostService,
    },
  ],
  // exports: [PostService],
  controllers: [PostController],
})
export class PostModule {}
