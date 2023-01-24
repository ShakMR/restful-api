import { Module, ValidationPipe } from "@nestjs/common";
import { PostModule } from './post/post.module';
import { APP_FILTER, APP_PIPE } from "@nestjs/core";
import { HttpExceptionFilter } from './HttpExceptionFilter';

@Module({
  imports: [PostModule],
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
