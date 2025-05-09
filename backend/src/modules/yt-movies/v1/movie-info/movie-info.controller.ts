import { Controller, Get, Query, UseFilters } from '@nestjs/common';
import { FiltersQueryDto } from './dto/filters-query.dto';
import { MovieInfoService } from './movie-info.service';
import type { TFiltersResponse } from './dto/filters-response.dto';
import { InfoSwagger } from './info.swagger';
import { HttpExceptionFilter } from 'src/shared/errors/http-exception.filter';

@Controller('v1/yt-movie')
@UseFilters(HttpExceptionFilter)
@InfoSwagger.YtApiTag
class MovieInfoController {
  constructor(private movieInfoService: MovieInfoService) {}

  @Get('filters')
  @InfoSwagger.YtFilters
  async getFilters(@Query() query: FiltersQueryDto): Promise<TFiltersResponse> {
    return this.movieInfoService.getFormats(query.url, query.clients);
  }
}
export { MovieInfoController };
