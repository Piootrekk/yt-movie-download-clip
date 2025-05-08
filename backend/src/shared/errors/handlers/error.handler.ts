import { HttpException } from '@nestjs/common';
import { IHttpConverterHandler } from './error-handler.interface';

class ErrorHandler implements IHttpConverterHandler {
  canHandle(err: unknown): boolean {
    return err instanceof Error;
  }
  handle(err: Error, code?: number): HttpException {
    return new HttpException(err.message, code || 500);
  }
}

export { ErrorHandler };
