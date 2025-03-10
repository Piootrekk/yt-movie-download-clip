import { Controller, Get } from '@nestjs/common';
import { HealthResponseDto } from './health.dto';
import { HealthApiTags, HealthSwagger } from './health.swagger';

@Controller('health')
@HealthApiTags
class HealthController {
  @Get()
  @HealthSwagger()
  gethealth(): HealthResponseDto {
    return { health: true };
  }
}

export { HealthController };
