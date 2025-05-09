import { HttpException } from '@nestjs/common';
import { IHttpConverterHandler } from './error-handler.interface';

class ErrorHandler implements IHttpConverterHandler {
  canHandle(err: unknown): boolean {
    return err instanceof Error;
  }
  handle(err: Error, code?: number): HttpException {
    const httpExp = new HttpException(err.message, code || 500);
    httpExp.stack = err.stack;
    return httpExp;
  }
}

export { ErrorHandler };
