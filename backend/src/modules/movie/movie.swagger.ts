import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

const YtApiTag = ApiTags('YT download');

const YtInfoSwagger = applyDecorators(
  ApiOperation({ summary: 'Get info about youtube video' }),
);

const YtValidateUrlSwagger = applyDecorators(
  ApiOperation({ summary: 'Validate if Url is correct' }),
);

const YtDownloadSwagger = applyDecorators(
  ApiOperation({ summary: 'Download youtube video' }),
);

const YtFiltersSwagger = applyDecorators(
  ApiOperation({ summary: 'Get fillters about video' }),
);

const YtItagsSwagger = applyDecorators(
  ApiOperation({ summary: 'Get available ' }),
);

const YtStreamSwagger = applyDecorators(
  ApiOperation({ summary: 'Pipe video stream' }),
);

const YTrimLocalSwagger = applyDecorators(
  ApiOperation({
    summary: 'Create trimmed local video file',
  }),
);

const YtTrimStreamSwagger = applyDecorators(
  ApiOperation({
    summary: 'Pipe trimmed stream ',
  }),
);

const YtMergeStreamSwagger = applyDecorators(
  ApiOperation({
    summary: 'Pipe merged (audio, video) stream',
  }),
);

const YtMergeLocalSwagger = applyDecorators(
  ApiOperation({
    summary: 'Create merged (audio, video) stream to file',
  }),
);

export {
  YtApiTag,
  YtValidateUrlSwagger,
  YtInfoSwagger,
  YtDownloadSwagger,
  YtFiltersSwagger,
  YtItagsSwagger,
  YtStreamSwagger,
  YTrimLocalSwagger,
  YtTrimStreamSwagger,
  YtMergeStreamSwagger,
  YtMergeLocalSwagger,
};
