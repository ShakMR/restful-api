import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class MediaDTO {
  @Exclude()
  id: number;

  uuid?: string;
  @IsNotEmpty()
  src: string;

  @Exclude()
  post: number;

  constructor(partial: Partial<MediaDTO>) {
    Object.assign(this, partial);
  }
}