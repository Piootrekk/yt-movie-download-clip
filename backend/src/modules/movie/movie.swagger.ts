import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  FiltersResponseDto,
  ItagsResponseDto,
  MovieErrorDto,
  ValidationResponseDto,
} from './movie.dto';

const streamContentSchema = {
  content: {
    'application/octet-stream': {
      schema: {
        type: 'string',
        format: 'binary',
      },
    },
  },
};

const YtApiTag = ApiTags('YT download');

const YtInfoSwagger = applyDecorators(
  ApiOperation({ summary: 'Get info about youtube video' }),
  ApiBadRequestResponse({
    description: 'Info error',
    type: MovieErrorDto,
    example: {
      message: 'Invalid yt link/info not found',
    },
  }),
);

const YtValidateUrlSwagger = applyDecorators(
  ApiOperation({ summary: 'Validate if url is correct' }),
  ApiBadRequestResponse({
    description: 'Validation error',
    type: MovieErrorDto,
    example: {
      message: 'Validation failed',
    },
  }),
  ApiOkResponse({
    description: 'Validation successfull',
    type: ValidationResponseDto,
  }),
);

const YtFiltersSwagger = applyDecorators(
  ApiOperation({ summary: 'Get fillters about video' }),
  ApiBadRequestResponse({
    description: 'Fetching filters failed',
    type: MovieErrorDto,
  }),
  ApiOkResponse({
    description: 'Filters response',
    type: FiltersResponseDto,
  }),
);

const YtItagsSwagger = applyDecorators(
  ApiOperation({ summary: 'Get available ' }),
  ApiBadRequestResponse({
    description: 'Fetching itags failed',
    type: MovieErrorDto,
  }),
  ApiOkResponse({
    description: 'Itags response',
    type: ItagsResponseDto,
  }),
);

const YtStreamSwagger = applyDecorators(
  ApiOperation({ summary: 'Pipe video stream' }),
  ApiBadRequestResponse({
    description: 'Streaming video went wrong',
    type: MovieErrorDto,
  }),
  ApiOkResponse({
    description: 'Stream full file',
    content: streamContentSchema.content,
  }),
);

const YTrimLocalSwagger = applyDecorators(
  ApiOperation({
    summary: 'Create trimmed local video file',
  }),
  ApiBadRequestResponse({
    description: 'Creating local file failed',
    type: MovieErrorDto,
  }),
  ApiNoContentResponse({
    description: 'File created successfully',
  }),
);

const YtTrimStreamSwagger = applyDecorators(
  ApiOperation({
    summary: 'Pipe trimmed stream ',
  }),
  ApiBadRequestResponse({
    description: 'Streaming video went wrong',
    type: MovieErrorDto,
  }),
  ApiOkResponse({
    description: 'Streamed trimmed file',
    content: streamContentSchema.content,
  }),
);

const YtMergeStreamSwagger = applyDecorators(
  ApiOperation({
    summary: 'Pipe merged (audio, video) stream',
  }),
  ApiOkResponse({
    description: 'Streamed audio & video file',
    content: streamContentSchema.content,
  }),
  ApiBadRequestResponse({
    description: 'Streaming video went wrong',
    type: MovieErrorDto,
  }),
);

const YtMergeLocalSwagger = applyDecorators(
  ApiOperation({
    summary: 'Create merged (audio, video) stream to file',
  }),
  ApiBadRequestResponse({
    description: 'Streaming video went wrong',
    type: MovieErrorDto,
  }),
  ApiNoContentResponse({
    description: 'File created successfully',
  }),
);

export {
  YtApiTag,
  YtValidateUrlSwagger,
  YtInfoSwagger,
  YtFiltersSwagger,
  YtItagsSwagger,
  YtStreamSwagger,
  YTrimLocalSwagger,
  YtTrimStreamSwagger,
  YtMergeStreamSwagger,
  YtMergeLocalSwagger,
};
