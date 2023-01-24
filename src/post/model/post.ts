import { Media } from '../../media/media.module';

type Post = {
  id: number;
  uuid: string;
  title: string;
  description: string;
  media?: Media[];
};

export default Post;
