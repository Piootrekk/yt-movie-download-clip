import { Controller, Get, Query } from '@nestjs/common';
import { FiltersQueryDto } from './dto/filters-query.dto';
import { MovieInfoService } from './movie-info.service';
import type { TFiltersResponse } from './dto/filters-response.dto';
import { InfoSwagger } from './info.swagger';

@Controller('v1/yt-movie')
@InfoSwagger.YtApiTag
class MovieInfoController {
  constructor(private movieInfoService: MovieInfoService) {}

  @Get('filters')
  @InfoSwagger.YtFiltersSwagger
  async getFilters(@Query() query: FiltersQueryDto): Promise<TFiltersResponse> {
    return this.movieInfoService.getFormats(query.url, query.clients);
  }
}
export { MovieInfoController };
