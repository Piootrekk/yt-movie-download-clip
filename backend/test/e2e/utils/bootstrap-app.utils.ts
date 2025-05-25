import { Type, ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Test, TestingModule } from '@nestjs/testing';

const createTestApp = async (
  ...modules: Type<unknown>[]
): Promise<NestFastifyApplication> => {
  const moduleRef: TestingModule = await Test.createTestingModule({
    imports: [...modules],
  }).compile();

  const app = moduleRef.createNestApplication<NestFastifyApplication>(
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
  return app;
};

export { createTestApp };
