import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { PostServiceInterface } from '../services/post-service.interface';
import { ApiResponse } from '../../types/api';
import { PostDTO } from './dto/post';
import { MediaDTO } from '../../media/controller/dto/media';

@Controller('posts')
export class PostController {
  constructor(@Inject('PostService') private service: PostServiceInterface) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getAll(
    @Query('search') search: string,
  ): Promise<ApiResponse<PostDTO[]>> {
    return {
      data: (await this.service.getAll(search)).map((p) => {
        const transformedMedia = p.media.map((m) => new MediaDTO(m));
        return new PostDTO({ ...p, media: transformedMedia });
      }),
      metadata: {},
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':uuid')
  async getOne(
    @Param('uuid') uuid: string,
    @Query('exclude') exclude?: 'media',
  ): Promise<ApiResponse<PostDTO>> {
    const post = await this.service.getByUuid(uuid, {
      includeMedia: !exclude || exclude !== 'media',
    });

    if (!post) {
      throw new HttpException(
        {
          code: 'ERR-1',
          status: `${HttpStatus.NOT_FOUND}`,
          title: 'Not found',
          details: "The Post requested couldn't be found",
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      data: new PostDTO({
        ...post,
        media: post.media.map((m) => new MediaDTO(m)),
      }),
      metadata: {},
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(@Body() postDTO: Omit<PostDTO, 'media'>) {
    const post = await this.service.create(postDTO);

    return {
      data: new PostDTO(post),
      metadata: {},
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':uuid')
  async update(
    @Param('uuid') uuid: string,
    @Body() postDTO: Partial<Omit<PostDTO, 'media'>>,
  ) {
    const existentPost = await this.service.getByUuid(uuid, {
      includeMedia: false,
    });

    if (!existentPost) {
      throw new HttpException(
        {
          code: 'ERR-1',
          status: `${HttpStatus.NOT_FOUND}`,
          title: 'Not found',
          details: "The Post requested couldn't be found",
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const updatedPost = {
      ...existentPost,
      ...postDTO,
    };

    await this.service.update(updatedPost);

    return {
      data: new PostDTO(updatedPost),
      metadata: {},
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':uuid')
  async delete(@Param('uuid') uuid: string) {
    const existentPost = await this.service.getByUuid(uuid, {
      includeMedia: false,
    });

    if (!existentPost) {
      throw new HttpException(
        {
          code: 'ERR-1',
          status: `${HttpStatus.NOT_FOUND}`,
          title: 'Not found',
          details: "The Post requested couldn't be found",
        },
        HttpStatus.NOT_FOUND,
      );
    }

    this.service.delete(existentPost);

    return {
      data: {},
      metadata: {},
    };
  }
}
