import { HttpException, Injectable } from '@nestjs/common';
import { IHttpConverterHandler } from '../http-converter.interface';

@Injectable()
class UnknownHandler implements IHttpConverterHandler {
  canHandle(err: unknown): boolean {
    return err instanceof HttpException;
  }
  handle(_: unknown, status?: number): HttpException {
    return new HttpException('Unknown error', status || 500);
  }
}

export { UnknownHandler };
