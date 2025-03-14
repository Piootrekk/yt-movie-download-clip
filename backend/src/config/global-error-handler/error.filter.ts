import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { HttpConverterService } from './http-error/http-converter.service';
import { FastifyReply } from 'fastify';

@Catch()
class GlobalExceptionFilter implements ExceptionFilter {
  private readonly httpConverterService: HttpConverterService;
  constructor(httpConverterService: HttpConverterService) {
    this.httpConverterService = httpConverterService;
  }

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const normalizedError = this.httpConverterService.normalizeError(exception);
    response.status(normalizedError.getStatus()).send({
      message: normalizedError.message,
    });
  }
}

export { GlobalExceptionFilter };
