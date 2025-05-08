import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { HttpConverterService } from './error.service';
import { FastifyReply } from 'fastify';

@Catch()
class HttpExceptionError implements ExceptionFilter {
  private readonly httpConverterService = new HttpConverterService();

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const normalizedError = this.httpConverterService.normalizeError(exception);
    const status = normalizedError.getStatus();
    const message = normalizedError.message;
    response.status(status).send({
      message,
    });
  }
}

export { HttpExceptionError };
