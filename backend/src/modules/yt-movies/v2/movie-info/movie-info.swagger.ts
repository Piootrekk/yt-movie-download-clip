import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { MovieErrorDto } from '../../base-dto/error-response.dto';
import { FiltersItemDto } from './dto/filters-response.dto';

const YtApiTag = ApiTags('YT download - info');

const YtFilters = applyDecorators(
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
    type: FiltersItemDto,
  }),
);

const MovieInfoSwagger = {
  YtApiTag,
  YtFilters,
};

export { MovieInfoSwagger };
