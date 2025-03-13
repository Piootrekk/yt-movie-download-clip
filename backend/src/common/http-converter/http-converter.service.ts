import { HttpException, Injectable } from '@nestjs/common';
import { IHttpConverterHandler } from './http-converter.interface';
import { ErrorHandler } from './handlers/error.handler';
import { UnknownHandler } from './handlers/unknown.handler';
import { HttpExceptionHandler } from './handlers/http-exception.handler';

@Injectable()
class ErrorService {
  private readonly handlers: IHttpConverterHandler[];
  constructor(
    erroHandler: ErrorHandler,
    httpExcHandler: HttpExceptionHandler,
    unknownHandler: UnknownHandler,
  ) {
    this.handlers = [erroHandler, httpExcHandler, unknownHandler];
  }

  normalizeError(error: unknown): HttpException {
    const handler = this.handlers.find((handler) => handler.canHandle(error));
    return handler
      ? handler.handle(error)
      : new HttpException('Unknown ninja error', 510);
  }
}

export { ErrorService };
