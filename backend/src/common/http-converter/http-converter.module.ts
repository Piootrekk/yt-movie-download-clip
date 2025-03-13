import { Module } from '@nestjs/common';
import { ErrorHandler } from './handlers/error.handler';
import { UnknownHandler } from './handlers/unknown.handler';
import { ErrorService } from './http-converter.service';
import { HttpExceptionHandler } from './handlers/http-exception.handler';

@Module({
  providers: [ErrorHandler, UnknownHandler, HttpExceptionHandler, ErrorService],
  exports: [ErrorService],
})
class HttpConverterHandler {}
