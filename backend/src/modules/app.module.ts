import { Module } from '@nestjs/common';
import { HealthModule } from 'src/modules/health/health.module';
import { MovieModule } from './movie/movie.module';

@Module({
  imports: [HealthModule, MovieModule],
})
class AppModule {}

export { AppModule };
