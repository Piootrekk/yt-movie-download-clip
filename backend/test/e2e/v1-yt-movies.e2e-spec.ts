import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify';
import { Test, TestingModule } from '@nestjs/testing';
import { YtMoviesV1Module } from '../../src/modules/yt-movies/v1/yt-movie.module';
import { ytMoviesMocks } from './yt-movies.mock';
import { ValidationPipe } from '@nestjs/common';

describe('V1 Movies Module (e2e)', () => {
  let app: NestFastifyApplication;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [YtMoviesV1Module],
    }).compile();

    app = moduleRef.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    app.enableCors();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    );
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });
  afterAll(async () => {
    await app.close();
  });

  describe('filters', () => {
    it('all filters (GET)', async () => {
      const urlQuery = new URLSearchParams({ url: ytMoviesMocks.url });
      const result = await app.inject({
        method: 'GET',
        url: `/v1/yt-movie/filters?${urlQuery.toString()}`,
      });
      const json = await result.json();

      expect(result.statusCode).toBe(200);
      ytMoviesMocks.formatsResponse.forEach((key) => {
        expect(Array.isArray(json[key])).toBe(true);
      });
    }, 15000);

    it('current selected props of formats (GET)', async () => {
      const urlQuery = new URLSearchParams({ url: ytMoviesMocks.url });
      ytMoviesMocks.filtersCase1.forEach((filter) =>
        urlQuery.append('selected', filter),
      );

      const result = await app.inject({
        method: 'GET',
        url: `/v1/yt-movie/selected-filters?${urlQuery.toString()}`,
      });
      const json = await result.json();

      expect(result.statusCode).toBe(200);
      ytMoviesMocks.formatsResponse.forEach((key) => {
        expect(Array.isArray(json[key])).toBe(true);
        json[key].forEach((item: unknown) => {
          ytMoviesMocks.filtersCase1.forEach((prop) => {
            expect(item).toHaveProperty(prop);
          });
        });
      });
    }, 15000);
  });
  describe('streams', () => {});
});
