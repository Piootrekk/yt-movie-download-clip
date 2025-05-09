import { HttpException } from '@nestjs/common';
import { ErrorHandler } from './handlers/error.handler';
import { UnknownHandler } from './handlers/unknown.handler';
import { HttpExceptionHandler } from './handlers/http-exception.handler';
import { IHttpConverterHandler } from './handlers/error-handler.interface';

class HttpConverterService {
  private handlers: IHttpConverterHandler[] = [
    new HttpExceptionHandler(),
    new ErrorHandler(),
    new UnknownHandler(),
  ];

  normalizeError(error: unknown, status?: number): HttpException {
    const handler = this.handlers.find((handler) => handler.canHandle(error));
    return handler
      ? handler.handle(error, status)
      : new HttpException('Unknown ninja error', 510);
  }
}

export { HttpConverterService };
