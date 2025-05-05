import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { setupSwagger } from './config/swagger-cfg';
import { ValidationPipe } from '@nestjs/common';
import { env } from './shared/env';
import { ApiModule } from './modules/api.module';

const bootstrap = async () => {
  const port = env.getPort();
  const app = await NestFactory.create<NestFastifyApplication>(
    ApiModule,
    new FastifyAdapter(),
  );

  setupSwagger(app);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  });
  await app.listen(port, '0.0.0.0');
};
bootstrap();
