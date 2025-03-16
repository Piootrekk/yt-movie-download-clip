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

export {
  YtApiTag,
  YtValidateUrlSwagger,
  YtInfoSwagger,
  YtDownloadSwagger,
  YtFiltersSwagger,
};
