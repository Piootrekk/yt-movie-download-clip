import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { MovieErrorDto } from '../../base-dto/error-response.dto';
import { FiltersResponseDto } from 'src/modules/movie/movie.dto';

const YtApiTag = ApiTags('YT download - info');

const YtFiltersSwagger = applyDecorators(
  ApiOperation({ summary: 'Get filters from yt movie' }),
  ApiBadRequestResponse({
    description: 'Fetching filters error',
    type: MovieErrorDto,
    example: {
      message: 'Invalid yt link/info not found',
    },
  }),
  ApiOkResponse({
    description: 'Filters response',
    type: FiltersResponseDto,
  }),
);

const InfoSwagger = {
  YtApiTag,
  YtFiltersSwagger,
};

export { InfoSwagger };
