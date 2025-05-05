import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { MovieErrorDto } from '../../base-dto/error-response.dto';
import { streamContentSchema } from '../../base-dto/stream-response.schema';

const YtApiTag = ApiTags('YT download - stream');

const streamAllSwagger = applyDecorators(
  ApiOperation({
    summary: 'Stream full video movie',
  }),
  ApiBadRequestResponse({
    description: 'Stream failed',
    type: MovieErrorDto,
  }),
  ApiOkResponse({
    description: 'Streaming successfull',
    content: streamContentSchema.content,
  }),
);

const streamTrimmedSwagger = applyDecorators(
  ApiOperation({
    summary: 'Stream trimmed video movie',
  }),
  ApiBadRequestResponse({
    description: 'Stream failed',
    type: MovieErrorDto,
  }),
  ApiOkResponse({
    description: 'Streaming successfull',
    content: streamContentSchema.content,
  }),
);
const streamMergedSwagger = applyDecorators(
  ApiOperation({
    summary: 'Stream merged video movie',
  }),
  ApiBadRequestResponse({
    description: 'Stream failed',
    type: MovieErrorDto,
  }),
  ApiOkResponse({
    description: 'Streaming successfull',
    content: streamContentSchema.content,
  }),
);

const StreamSwagger = {
  YtApiTag,
  streamAllSwagger,
  streamMergedSwagger,
  streamTrimmedSwagger,
};

export { StreamSwagger };
