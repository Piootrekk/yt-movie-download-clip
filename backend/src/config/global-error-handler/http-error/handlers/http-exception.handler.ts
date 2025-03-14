import { HttpException, Injectable } from '@nestjs/common';
import { IHttpConverterHandler } from '../http-converter.interface';

@Injectable()
class HttpExceptionHandler implements IHttpConverterHandler {
  canHandle(err: unknown): boolean {
    return err instanceof HttpException;
  }
  handle(err: HttpException): HttpException {
    return err;
  }
}

export { HttpExceptionHandler };
