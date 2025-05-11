import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { MovieErrorDto } from '../../base-dto/error-response.dto';
import { FiltersResponseDto } from './dto/filters-response.dto';
import { FiltersSelectedResponseDto } from './dto/filters-selected-response.dto';

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
    type: FiltersResponseDto,
  }),
);

const YtSelectedFilters = applyDecorators(
  ApiOperation({ summary: 'Get selected from query filters for yt movie' }),
  ApiBadRequestResponse({
    description: 'Fetching filters error',
    type: MovieErrorDto,
    example: {
      message: 'Invalid yt link/info not found',
    },
  }),
  ApiOkResponse({
    description: 'Filters response',
    type: FiltersSelectedResponseDto,
  }),
);

const InfoSwagger = {
  YtApiTag,
  YtFilters,
  YtSelectedFilters,
};

export { InfoSwagger };
