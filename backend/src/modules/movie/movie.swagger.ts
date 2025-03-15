import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import {
  MovieDownloadQueryCustomClientDto,
  MovieDownloadQueryDto,
  MovieQueryCustomClientsDto,
  MovieQueryDto,
} from './movie.dto';

const YtApiTag = ApiTags('YT download');

const YtInfoSwagger = applyDecorators(
  ApiOperation({ summary: 'Get info about youtube video' }),
);

const YtDownloadCustomClientsSwagger = applyDecorators(
  ApiOperation({
    summary: 'Download youtube video with custom clients',
  }),
);

const YtInfoCustomClientsSwagger = applyDecorators(
  ApiOperation({ summary: 'Get info about yt video with custom clients' }),
);

const YtDownloadSwagger = applyDecorators(
  ApiOperation({ summary: 'Download youtube video' }),
);

const YtFiltersSwagger = applyDecorators(
  ApiOperation({ summary: 'Get fillters about video' }),
);

const YtFiltersCustomClientsSwagger = applyDecorators(
  ApiOperation({ summary: 'Get fillters about video with custom clients' }),
);

export {
  YtApiTag,
  YtInfoSwagger,
  YtDownloadSwagger,
  YtDownloadCustomClientsSwagger,
  YtInfoCustomClientsSwagger,
  YtFiltersSwagger,
  YtFiltersCustomClientsSwagger,
};
