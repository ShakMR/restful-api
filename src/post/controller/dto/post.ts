import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { MediaDTO } from '../../../media/media.module';

export class PostDTO {
  @Exclude()
  id: number;

  uuid?: string;
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  media?: MediaDTO[];

  constructor(partial: Partial<PostDTO>) {
    Object.assign(this, partial);
  }
}
