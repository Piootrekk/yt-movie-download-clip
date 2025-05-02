import { Controller, Get, Query } from '@nestjs/common';
import { FiltersQueryDto } from './dto/filters-query.dto';
import { MovieInfoService } from './movie-info.service';
import type { TFiltersResponse } from './dto/filters-response.dto';

@Controller('v1/yt-movie')
class MovieInfoController {
  constructor(private movieInfoService: MovieInfoService) {}

  @Get('filters')
  async getFilters(@Query() query: FiltersQueryDto): Promise<TFiltersResponse> {
    return this.movieInfoService.getFormats(query.url, query.clients);
  }
  
}
export { MovieInfoController };
