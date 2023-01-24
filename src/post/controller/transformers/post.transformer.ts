import { Inject, Injectable } from '@nestjs/common';
import Post from '../../model/post';
import { HateoasPost, PostDTO } from '../dto/post';
import MediaTransformer from '../../../media/controller/transformers/media.transformer';

@Injectable()
class PostTransformer {
  constructor(
    @Inject('MediaTransformer') private mediaTransformer: MediaTransformer,
  ) {}

  addLinks(postDto: PostDTO): HateoasPost {
    return {
      ...postDto,
      _links: {
        self: `/posts/${postDto.uuid}`,
        media: `/posts/${postDto.uuid}/media`,
        posts: '/posts/',
      },
    };
  }

  toDTO(post: Post): HateoasPost {
    const postDTO = new PostDTO({
      ...post,
      media: this.mediaTransformer.toDTOCollection(post.media),
    });

    return this.addLinks(postDTO);
  }

  toDTOCollection(posts: Post[]): HateoasPost[] {
    return posts.map((post) => this.toDTO(post));
  }
}

export default PostTransformer;
