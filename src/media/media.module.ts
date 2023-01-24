import { Module } from '@nestjs/common';
import { MediaController } from './controller/media.controller';
import { MediaService } from './services/media.service';
import { MediaMockRepository } from './repository/media-mock.repository';
import MediaTransformer from "./controller/transformers/media.transformer";

export { default as Media } from './model/media';
export { MediaDTO } from './controller/dto/media';

@Module({
  controllers: [MediaController],
  providers: [
    {
      provide: 'MediaService',
      useClass: MediaService,
    },
    {
      provide: 'MediaRepository',
      useClass: MediaMockRepository,
    },
    {
      provide: 'MediaTransformer',
      useClass: MediaTransformer,
    },
  ],
  exports: [
    {
      provide: 'MediaService',
      useClass: MediaService,
    },
    {
      provide: 'MediaTransformer',
      useClass: MediaTransformer,
    },
  ],
})
export class MediaModule {}
