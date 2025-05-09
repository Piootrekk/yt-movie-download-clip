import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { HttpConverterService } from './error.service';
import { FastifyReply } from 'fastify';

@Catch()
class HttpExceptionFilter implements ExceptionFilter {
  private httpConverterService = new HttpConverterService();

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const normalizedError = this.httpConverterService.normalizeError(exception);
    const status = normalizedError.getStatus();
    const message = normalizedError.message;
    const stack = normalizedError.stack;
    const cause = normalizedError.cause;
    response.status(status).send({
      message,
      stack,
      cause,
    });
  }
}

export { HttpExceptionFilter };
