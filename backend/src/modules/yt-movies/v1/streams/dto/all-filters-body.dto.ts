import { videoFormat } from '@distube/ytdl-core';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsObject, IsOptional, IsUrl } from 'class-validator';

class AllByFiltersBodyDto {
  @ApiProperty({
    type: String,
  })
  @IsUrl()
  url: string;

  @ApiProperty({
    type: Number,
    required: false,
    example: 1024,
  })
  @IsNumber()
  @IsOptional()
  chunkSize?: number;

  @ApiProperty({
    type: Object,
  })
  @IsObject()
  filters: videoFormat;
}

type TAllByFiltersBodyDto = InstanceType<typeof AllByFiltersBodyDto>;

export { AllByFiltersBodyDto };
export type { TAllByFiltersBodyDto };
