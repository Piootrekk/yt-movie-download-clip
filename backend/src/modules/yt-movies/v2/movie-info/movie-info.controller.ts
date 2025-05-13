import { Controller, Get, Query, UseFilters } from '@nestjs/common';
import { MovieInfoService } from './movie-info.service';
import { BaseQueryDto } from '../../base-dto/query.dto';
import { HttpExceptionFilter } from 'src/shared/errors/http-exception.filter';
import { MovieInfoSwagger } from './movie-info.swagger';

@Controller('v2/yt-movie')
@UseFilters(HttpExceptionFilter)
@MovieInfoSwagger.YtApiTag
class MovieInfoController {
  constructor(private movieInfoService: MovieInfoService) {}
  @Get('filters')
  @MovieInfoSwagger.YtFilters
  async getFilters(@Query() query: BaseQueryDto) {
    return this.movieInfoService.getFormats({ ...query });
  }
}

export { MovieInfoController };
