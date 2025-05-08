import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  UseFilters,
} from '@nestjs/common';
import { HealthResponseDto } from './health.dto';
import { HealthSwagger } from './health.swagger';
import { HttpConverterService } from 'src/shared/errors/error.service';

@Controller('health')
@UseFilters(HttpConverterService)
@HealthSwagger.HealthApiTags
class HealthController {
  @Get()
  @HealthSwagger.Health()
  gethealth(): HealthResponseDto {
    return { health: true };
  }

  @Get('unhealth/http-exception')
  @HealthSwagger.UnHealth()
  getUnhealthHttpException(): never {
    throw new HttpException('HttpException appear', HttpStatus.I_AM_A_TEAPOT);
  }
  @Get('unhealth/error')
  @HealthSwagger.UnHealth()
  getUnhealthDefaultException(): never {
    throw new Error('Default Error appear');
  }
  @Get('unhealth/unknown')
  @HealthSwagger.UnHealth()
  getUnhealthUnknownException(): never {
    throw new Object({ message: 'Ughh, dont try it on production' });
  }
}

export { HealthController };
