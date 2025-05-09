import { HttpException } from '@nestjs/common';
import { IHttpConverterHandler } from './error-handler.interface';

class UnknownHandler implements IHttpConverterHandler {
  canHandle(_: unknown): boolean {
    return true;
  }
  handle(_: unknown, status?: number): HttpException {
    const httpExp = new HttpException('Unknown error', status || 500);
    return new HttpException('Unknown error', status || 500);
  }
}

export { UnknownHandler };
