import { HttpException } from '@nestjs/common';
import { IHttpConverterHandler } from './error-handler.interface';

class HttpExceptionHandler implements IHttpConverterHandler {
  canHandle(err: unknown): boolean {
    return err instanceof HttpException;
  }
  handle(err: HttpException): HttpException {
    return err;
  }
}

export { HttpExceptionHandler };
