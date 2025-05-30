import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { HealthResponseDto } from './health.dto';
import { applyDecorators } from '@nestjs/common';

const HealthApiTags = ApiTags('health');

const Health = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Health Check' }),
    ApiOkResponse({
      description: 'Returns application health status.',
      type: HealthResponseDto,
      example: { success: true },
    }),
    ApiBadRequestResponse({
      description: 'Health status failed',
      type: HealthResponseDto,
      example: { success: false },
    }),
  );
};

const UnHealth = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Global error catcher checker' }),
  );
};

const HealthSwagger = {
  HealthApiTags,
  Health,
  UnHealth,
};

export { HealthSwagger };
