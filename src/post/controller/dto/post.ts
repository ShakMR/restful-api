import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { MediaDTO } from '../../../media/media.module';
import { ApiProperty } from "@nestjs/swagger";

export class PostDTO {
  @Exclude()
  id: number;

  uuid?: string;
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  media?: MediaDTO[];

  constructor(partial: Partial<PostDTO>) {
    Object.assign(this, partial);
  }
}
