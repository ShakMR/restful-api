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
import { PostDTO, HateoasPost } from './dto/post';
import { MediaDTO } from '../../media/controller/dto/media';
import { ApiTags } from '@nestjs/swagger';
import PostTransformer from './transformers/post.transformer';

@ApiTags('posts')
@Controller('posts')
export class PostController {
  constructor(
    @Inject('PostService') private service: PostServiceInterface,
    @Inject('PostTransformer') private transformer: PostTransformer,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getAll(
    @Query('search') search: string,
    @Query('exclude') exclude: 'media',
  ): Promise<ApiResponse<PostDTO[]>> {
    const posts = await this.service.getAll({
      search,
      includeMedia: !exclude || exclude !== 'media',
    });

    return {
      data: this.transformer.toDTOCollection(posts),
      metadata: {},
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':uuid')
  async getOne(
    @Param('uuid') uuid: string,
    @Query('exclude') exclude?: 'media',
  ): Promise<ApiResponse<HateoasPost>> {
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
      data: this.transformer.toDTO(post),
      metadata: {},
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(@Body() postDTO: PostDTO) {
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
