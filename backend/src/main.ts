import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './modules/app.module';
import { setupSwagger } from './config/swagger-cfg';
import { ValidationPipe } from '@nestjs/common';

const bootstrap = async () => {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  setupSwagger(app);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
};
bootstrap();
