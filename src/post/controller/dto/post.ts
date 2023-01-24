import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class PostDTO {
  @Exclude()
  id: number;

  uuid?: string;
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  constructor(partial: Partial<PostDTO>) {
    Object.assign(this, partial);
  }
}
