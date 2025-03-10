import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const setupSwagger = (app: INestApplication): void => {
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('NestJS API with Swagger')
    .setVersion('1.0')
    .addTag('health')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document, {
    jsonDocumentUrl: 'api/json',
  });
};

export { setupSwagger };
