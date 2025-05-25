import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { YtMoviesV1Module } from '../../src/modules/yt-movies/v1/yt-movie.module';
import {
  FILTERS_TIMEOUT,
  selectedItagMergeMock,
  STREAM_TIMEOUT,
  ytMoviesInfoMocks,
  ytSteamAllMock,
  ytStreamTrimmedMock,
} from './yt-movies.mock';
import { createTestApp } from './utils/bootstrap-app.utils';
import { injectFilters } from './utils/inject-formats.utils';

describe('V1 Movies Module (e2e)', () => {
  let app: NestFastifyApplication;

  beforeAll(async () => {
    app = await createTestApp(YtMoviesV1Module);
  });
  afterAll(async () => {
    await app.close();
  });

  describe('filters', () => {
    it(
      'all filters (GET)',
      async () => {
        const urlQuery = new URLSearchParams({ url: ytMoviesInfoMocks.url });
        const result = await app.inject({
          method: 'GET',
          url: `/v1/yt-movie/filters?${urlQuery.toString()}`,
        });
        const json: Record<string, unknown[]> = await result.json();

        expect(result.statusCode).toBe(200);
        ytMoviesInfoMocks.formatsResponse.forEach((key) => {
          expect(Array.isArray(json[key])).toBe(true);
        });
      },
      FILTERS_TIMEOUT,
    );
    it(
      'all filters, invalid link (GET)',
      async () => {
        const urlQuery = new URLSearchParams({
          url: ytMoviesInfoMocks.invalidUrl,
        });
        const result = await app.inject({
          method: 'GET',
          url: `/v1/yt-movie/filters?${urlQuery.toString()}`,
        });
        const json: Record<string, unknown[]> = await result.json();
        expect(result.statusCode).toBe(400);
        expect(json).toHaveProperty('message', 'Not a YouTube domain');
      },
      FILTERS_TIMEOUT,
    );

    it(
      'all filters with custom client (GET)',
      async () => {
        const urlQuery = new URLSearchParams({ url: ytMoviesInfoMocks.url });
        ytMoviesInfoMocks.clientsCase1.forEach((client) => {
          urlQuery.append('client', client);
        });
        const result = await app.inject({
          method: 'GET',
          url: `/v1/yt-movie/filters?${urlQuery.toString()}`,
        });
        const json: Record<string, unknown[]> = await result.json();
        expect(result.statusCode).toBe(200);
        ytMoviesInfoMocks.formatsResponse.forEach((key) => {
          expect(Array.isArray(json[key])).toBe(true);
        });
      },
      FILTERS_TIMEOUT,
    );
  });
  describe('selected filters', () => {
    it(
      'current selected props of formats (GET)',
      async () => {
        const urlQuery = new URLSearchParams({ url: ytMoviesInfoMocks.url });
        ytMoviesInfoMocks.filtersCase1.forEach((filter) =>
          urlQuery.append('selected', filter),
        );

        const result = await app.inject({
          method: 'GET',
          url: `/v1/yt-movie/selected-filters?${urlQuery.toString()}`,
        });
        const json: Record<string, unknown[]> = await result.json();

        expect(result.statusCode).toBe(200);
        ytMoviesInfoMocks.formatsResponse.forEach((key) => {
          expect(Array.isArray(json[key])).toBe(true);
          json[key].forEach((item: unknown) => {
            ytMoviesInfoMocks.filtersCase1.forEach((prop) => {
              expect(item).toHaveProperty(prop);
            });
          });
        });
      },
      FILTERS_TIMEOUT,
    );
  });
  describe('streams', () => {
    it(
      'stream video all (POST),',
      async () => {
        const filters = await injectFilters(app);
        const result = await app.inject({
          method: 'POST',
          url: '/yt-movie/v1/stream/all',
          payload: {
            ...ytSteamAllMock,
            filters: filters.both[0],
          },
        });
        expect(result.statusCode).toBe(201);
        const buffer = result.rawPayload;
        expect(Buffer.isBuffer(buffer)).toBe(true);
        expect(buffer.length).toBeGreaterThan(0);
      },
      STREAM_TIMEOUT,
    );
    it(
      'stream video trimmed (POST),',
      async () => {
        const filters = await injectFilters(app);
        const result = await app.inject({
          method: 'POST',
          url: '/yt-movie/v1/stream/trim',
          payload: {
            ...ytStreamTrimmedMock,
            filters: filters.both[0],
          },
        });
        expect(result.statusCode).toBe(201);
        const buffer = result.rawPayload;
        expect(Buffer.isBuffer(buffer)).toBe(true);
        expect(buffer.length).toBeGreaterThan(0);
      },
      STREAM_TIMEOUT,
    );
    it(
      'stream video merge (POST),',
      async () => {
        const filters = await injectFilters(app);
        const result = await app.inject({
          method: 'POST',
          url: '/yt-movie/v1/stream/merge',
          payload: {
            ...ytStreamTrimmedMock,
            videoFilters: filters.video.find(
              (video) => video.itag === selectedItagMergeMock.videoItag,
            ),
            audioFilters: filters.audio.find(
              (audio) => audio.itag === selectedItagMergeMock.audioItag,
            ),
          },
        });
        expect(result.statusCode).toBe(201);
        const buffer = result.rawPayload;
        expect(Buffer.isBuffer(buffer)).toBe(true);
        expect(buffer.length).toBeGreaterThan(0);
      },
      STREAM_TIMEOUT,
    );
  });
});
