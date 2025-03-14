import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { HealthResponseDto } from './health.dto';
import {
  HealthApiTags,
  HealthSwagger,
  UnHealthSwagger,
} from './health.swagger';

@Controller('health')
@HealthApiTags
class HealthController {
  @Get()
  @HealthSwagger()
  gethealth(): HealthResponseDto {
    return { health: true };
  }

  @Get('unhealth')
  @UnHealthSwagger()
  getUnhealth() {
    throw new HttpException('asdasd', HttpStatus.I_AM_A_TEAPOT);
  }
}

export { HealthController };
