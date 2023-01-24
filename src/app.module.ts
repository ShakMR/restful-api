import { Module, ValidationPipe } from "@nestjs/common";
import { PostModule } from './post/post.module';
import { APP_FILTER, APP_PIPE } from "@nestjs/core";
import { HttpExceptionFilter } from './HttpExceptionFilter';
import { MediaModule } from './media/media.module';

@Module({
  imports: [PostModule, MediaModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
