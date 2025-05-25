import { TFilters } from 'src/core/download-manager/types/ytdlp.types';
import { ytMoviesInfoMocks } from '../yt-movies.mock';
import { NestFastifyApplication } from '@nestjs/platform-fastify';

const injectFilters = async (app: NestFastifyApplication) => {
  const urlQuery = new URLSearchParams({ url: ytMoviesInfoMocks.url });
  const result = await app.inject({
    method: 'GET',
    url: `/v1/yt-movie/filters?${urlQuery.toString()}`,
  });
  const filters: TFilters = await result.json();
  return filters;
};

export { injectFilters };
