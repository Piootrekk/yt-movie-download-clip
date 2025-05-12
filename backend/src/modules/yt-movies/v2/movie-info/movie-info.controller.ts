import { Controller, Get, Query, UseFilters } from '@nestjs/common';
import { MovieInfoService } from './movie-info.service';
import { BaseQueryDto } from '../../base-dto/query.dto';
import { HttpExceptionFilter } from 'src/shared/errors/http-exception.filter';

@Controller('v2/yt-movie')
@UseFilters(HttpExceptionFilter)
class MovieInfoController {
  constructor(private movieInfoService: MovieInfoService) {}

  @Get('filters')
  async getFilters(@Query() query: BaseQueryDto) {
    return this.movieInfoService.getFormats({ ...query });
  }
}

export { MovieInfoController };
