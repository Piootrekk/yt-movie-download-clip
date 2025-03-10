import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

class HealthResponseDto {
  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsBoolean()
  health: boolean;
}

export { HealthResponseDto };
