import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { YtdlService } from './services/ytdl.service';

@Module({
  controllers: [MovieController],
  providers: [YtdlService],
})
class MovieModule {}

export { MovieModule };
