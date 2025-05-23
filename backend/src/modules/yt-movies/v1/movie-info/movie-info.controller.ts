import {
  Controller,
  Get,
  Query,
  UseFilters,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FiltersQueryDto } from './dto/filters-query.dto';
import { MovieInfoService } from './movie-info.service';
import { InfoSwagger } from './info.swagger';
import { HttpExceptionFilter } from 'src/shared/errors/http-exception.filter';
import { SelectedFiltersDto } from './dto/filter-selected.dto';
import type { TFiltersResponse } from './dto/filters-response.dto';
import type { TFiltersSelectedResponseDto } from './dto/filters-selected-response.dto';
import { MeasureTimeInterceptor } from 'src/shared/measures/measure-time.interceptor';

@Controller('v1/yt-movie')
@UseFilters(HttpExceptionFilter)
@InfoSwagger.YtApiTag
@UseInterceptors(MeasureTimeInterceptor)
class MovieInfoController {
  constructor(private movieInfoService: MovieInfoService) {}

  @Get('filters')
  @InfoSwagger.YtFilters
  async getFilters(@Query() query: FiltersQueryDto): Promise<TFiltersResponse> {
    return this.movieInfoService.getFormats({ ...query });
  }

  @Get('selected-filters')
  @InfoSwagger.YtSelectedFilters
  async getCurrentFilters(
    @Query() query: SelectedFiltersDto,
  ): Promise<TFiltersSelectedResponseDto> {
    return this.movieInfoService.getSelectedFormats({ ...query });
  }
}
export { MovieInfoController };
