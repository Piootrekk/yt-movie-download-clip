import { HttpException } from '@nestjs/common';

type IHttpConverterHandler = {
  canHandle(err: unknown): boolean;
  handle(err: unknown, code?: number): HttpException;
};

export { IHttpConverterHandler };
