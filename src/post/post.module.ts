import { Module } from '@nestjs/common';
import { PostService } from './services/post.service';
import { PostMockRepository } from './repository/post-mock.repository';
import { PostController } from './controller/post.controller';
import { MediaModule } from '../media/media.module';
import PostTransformer from './controller/transformers/post.transformer';

@Module({
  imports: [MediaModule],
  providers: [
    {
      provide: 'PostRepository',
      useClass: PostMockRepository,
    },
    {
      provide: 'PostService',
      useClass: PostService,
    },
    {
      provide: 'PostTransformer',
      useClass: PostTransformer,
    },
  ],
  controllers: [PostController],
})
export class PostModule {}
