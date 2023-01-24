import { Exclude } from "class-transformer";

export class PostDTO {
  @Exclude()
  id: number;

  uuid: string;
  title: string;
  description: string;
  user: number;

  constructor(partial: Partial<PostDTO>) {
    Object.assign(this, partial);
  }
}