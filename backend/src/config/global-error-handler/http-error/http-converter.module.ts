import { Module } from '@nestjs/common';
import { ErrorHandler } from './handlers/error.handler';
import { UnknownHandler } from './handlers/unknown.handler';
import { HttpConverterService } from './http-converter.service';
import { HttpExceptionHandler } from './handlers/http-exception.handler';

@Module({
  providers: [
    ErrorHandler,
    UnknownHandler,
    HttpExceptionHandler,
    HttpConverterService,
  ],
  exports: [HttpConverterService],
})
class HttpConverterModule {}

export { HttpConverterModule };
