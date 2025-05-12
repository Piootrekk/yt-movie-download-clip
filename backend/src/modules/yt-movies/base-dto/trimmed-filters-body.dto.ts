import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Matches, IsString, IsNumber, Min } from 'class-validator';

class TrimmedBaseBodyDto {
  @ApiProperty({
    type: String,
    description: 'Time format must be HH:MM:SS.mmm',
    default: '00:00:00.000',
  })
  @Matches(/^([0-9]{2}):([0-5][0-9]):([0-5][0-9])\.(\d{3})$/, {
    message: 'Time format must be HH:MM:SS.mmm',
  })
  @IsString()
  start: string;

  @ApiProperty({
    type: Number,
    description: 'Duration should be provided in seconds',
  })
  @IsNumber()
  @Min(0.001)
  @Type(() => Number)
  duration: number;
}

type TTrimmedBaseBodyDto = InstanceType<typeof TrimmedBaseBodyDto>;

export { TrimmedBaseBodyDto };
export type { TTrimmedBaseBodyDto };
