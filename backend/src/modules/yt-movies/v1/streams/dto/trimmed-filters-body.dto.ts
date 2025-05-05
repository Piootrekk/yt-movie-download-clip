import { ApiProperty } from '@nestjs/swagger';
import { AllByFiltersBodyDto } from './all-filters-body.dto';
import { IsNumber, IsString } from 'class-validator';

class TrimmedFiltersBodyDto extends AllByFiltersBodyDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  start: string;

  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  duration: number;
}

type TTrimmedFiltersBodyDto = InstanceType<typeof TrimmedFiltersBodyDto>;

export { TrimmedFiltersBodyDto };

export type { TTrimmedFiltersBodyDto };
