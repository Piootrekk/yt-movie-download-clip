import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { YtdlService } from './services/ytdl.service';
import { FfmpegService } from './services/ffmpeg.service';

@Module({
  controllers: [MovieController],
  providers: [YtdlService, FfmpegService],
})
class MovieModule {}

export { MovieModule };
