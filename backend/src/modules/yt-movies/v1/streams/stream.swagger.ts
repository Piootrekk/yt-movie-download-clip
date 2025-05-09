import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { MovieErrorDto } from '../../base-dto/error-response.dto';
import { streamContentSchema } from '../../base-dto/stream-response.schema';

const YtApiTag = ApiTags('YT download - stream');

const streamAll = applyDecorators(
  ApiOperation({
    summary: 'Stream full video movie',
  }),
  ApiBadRequestResponse({
    description: 'Stream failed',
    type: MovieErrorDto,
  }),
  ApiCreatedResponse({
    description: 'Streaming successfull',
    content: streamContentSchema.content,
  }),
);

const streamTrimmed = applyDecorators(
  ApiOperation({
    summary: 'Stream trimmed video movie',
  }),
  ApiBadRequestResponse({
    description: 'Stream failed',
    type: MovieErrorDto,
  }),
  ApiCreatedResponse({
    description: 'Streaming successfull',
    content: streamContentSchema.content,
  }),
);
const streamMerged = applyDecorators(
  ApiOperation({
    summary: 'Stream merged video movie',
  }),
  ApiBadRequestResponse({
    description: 'Stream failed',
    type: MovieErrorDto,
  }),
  ApiCreatedResponse({
    description: 'Streaming successfull',
    content: streamContentSchema.content,
  }),
);

const StreamSwagger = {
  YtApiTag,
  streamAll,
  streamMerged,
  streamTrimmed,
};

export { StreamSwagger };
