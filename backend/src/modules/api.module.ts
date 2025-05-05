import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { YtMoviesV2Module } from './yt-movies/v2/yt-movie.module';
import { YtMoviesV1Module } from './yt-movies/v1/yt-movie.module';

@Module({
  imports: [HealthModule, YtMoviesV1Module, YtMoviesV2Module],
})
class ApiModule {}

export { ApiModule };
