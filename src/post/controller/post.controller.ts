import {
  Body,
  ClassSerializerInterceptor,
  Controller, Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Query,
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
  async getAll(
    @Query('search') search: string,
  ): Promise<ApiResponse<PostDTO[]>> {
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

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':uuid')
  async update(@Param('uuid') uuid: string, @Body() postDTO: Partial<PostDTO>) {
    const existentPost = await this.service.getByUuid(uuid);

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
    const existentPost = await this.service.getByUuid(uuid);

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
