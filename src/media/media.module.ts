import { Module } from '@nestjs/common';
import { MediaController } from './controller/media.controller';
import { MediaService } from './services/media.service';
import { MediaMockRepository } from './repository/media-mock.repository';

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
  ],
  exports: [
    {
      provide: 'MediaService',
      useClass: MediaService,
    },
  ],
})
export class MediaModule {}
