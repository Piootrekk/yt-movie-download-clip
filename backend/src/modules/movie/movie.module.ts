import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { YtdlService } from './services/ytdl.service';
import { FfmpegService } from './services/ffmpeg.service';
import { FsService } from './services/fs.service';
import { MovieService } from './movie.service';
import { YtDlpService } from './services/ytdlp.service';

@Module({
  controllers: [MovieController],
  providers: [
    YtdlService,
    FfmpegService,
    FsService,
    YtDlpService,
    MovieService,
  ],
})
class MovieModule {}

export { MovieModule };
