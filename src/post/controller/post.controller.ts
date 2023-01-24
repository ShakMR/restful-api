import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param, Post, Query,
  UseInterceptors
} from "@nestjs/common";
import { PostServiceInterface } from '../services/post-service.interface';
import { ApiResponse } from '../../types/api';
import { PostDTO } from './dto/post';

@Controller('posts')
export class PostController {
  constructor(@Inject('PostService') private service: PostServiceInterface) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getAll(@Query('search') search: string): Promise<ApiResponse<PostDTO[]>> {
    return {
      data: (await this.service.getAll(search)).map((p) => new PostDTO(p)),
      metadata: {},
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':uuid')
  async getOne(@Param('uuid') uuid: string): Promise<ApiResponse<PostDTO>> {
    const post = await this.service.getByUuid(uuid);

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
      data: new PostDTO(post),
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
}
