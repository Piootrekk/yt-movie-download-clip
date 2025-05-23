import { Test, TestingModule } from '@nestjs/testing';
import { HealthModule } from './../../src/modules/health/health.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

describe('Health Module (e2e)', () => {
  let app: NestFastifyApplication;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [HealthModule],
    }).compile();

    app = moduleRef.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it('health (GET)', async () => {
    const result = await app.inject({ method: 'GET', url: '/health' });
    expect(result.statusCode).toEqual(200);
    expect(result.json()).toEqual({ health: true });
  });

  it('unhealth http-exception (GET)', async () => {
    const result = await app.inject({
      method: 'GET',
      url: '/health/unhealth/http-exception',
    });
    expect(result.statusCode).toEqual(418);
    expect(result.json()).toHaveProperty('message');
  });
  it('unhealth unknown-exception (GET)', async () => {
    const result = await app.inject({
      method: 'GET',
      url: '/health/unhealth/unknown',
    });
    expect(result.statusCode).toEqual(500);
    expect(result.json()).toHaveProperty('message');
  });
});
