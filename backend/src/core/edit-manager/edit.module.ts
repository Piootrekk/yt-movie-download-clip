import { Module } from '@nestjs/common';
import { FfmpegService } from './ffmpeg.service';

@Module({
  providers: [FfmpegService],
  exports: [FfmpegService],
})
class EditModule {}

export { EditModule };
