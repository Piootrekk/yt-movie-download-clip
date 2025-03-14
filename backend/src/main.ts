import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { setupSwagger } from './config/swagger-cfg';
import { ValidationPipe } from '@nestjs/common';
import { HttpConverterService } from './config/global-error-handler/http-error/http-converter.service';
import { GlobalExceptionFilter } from './config/global-error-handler/error.filter';
import { CoreModule } from './core.module';

const bootstrap = async () => {
  const app = await NestFactory.create<NestFastifyApplication>(
    CoreModule,
    new FastifyAdapter(),
  );

  const httpConverterService = app.get(HttpConverterService);

  setupSwagger(app);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      whitelist: true,
    }),
  );
  app.useGlobalFilters(new GlobalExceptionFilter(httpConverterService));
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
};
bootstrap();
