import { Injectable } from '@nestjs/common';
import Post from '../../model/post';
import { HateoasPost, PostDTO } from '../dto/post';
import { MediaDTO } from '../../../media/controller/dto/media';

@Injectable()
class PostTransformer {
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
      media: post.media.map((m) => new MediaDTO(m)),
    });

    return this.addLinks(postDTO);
  }

  toDTOCollection(posts: Post[]): HateoasPost[] {
    return posts.map((post) => this.toDTO(post));
  }
}

export default PostTransformer;
