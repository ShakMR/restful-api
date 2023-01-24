import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param, UseInterceptors
} from "@nestjs/common";
import { PostServiceInterface } from '../services/post-service.interface';
import Post from '../model/post';
import { ApiResponse } from '../../types/api';
import { PostDTO } from "./dto/post";

@Controller('posts')
export class PostController {
  constructor(@Inject('PostService') private service: PostServiceInterface) {}

  @Get()
  async getAll(): Promise<ApiResponse<PostDTO[]>> {
    return {
      data: (await this.service.getAll()).map(p => new PostDTO(p)),
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
}
