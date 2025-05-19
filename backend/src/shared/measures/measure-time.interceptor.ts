import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { tap } from 'rxjs';

@Injectable()
class MeasureTimeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const method = request.method;
    const url = request.url;
    const startTime = performance.now();
    return next.handle().pipe(
      tap(() => {
        const stopTime = performance.now();
        const executionTime = (stopTime - startTime) / 1000;
        console.log(`[${method}] ${url} - ${executionTime}s`);
      }),
    );
  }
}

export { MeasureTimeInterceptor };
