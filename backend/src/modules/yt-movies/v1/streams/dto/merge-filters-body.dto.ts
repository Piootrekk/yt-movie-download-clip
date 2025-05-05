import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';
import { videoFormat } from '@distube/ytdl-core';

class MergeByFiltersBodyDto {
  @ApiProperty({
    type: String,
  })
  @IsUrl()
  url: string;

  @ApiProperty({
    type: Number,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  chunkSize?: number;

  @ApiProperty({
    type: Object,
  })
  videoFilters: videoFormat;

  @ApiProperty({
    type: Object,
  })
  audioFilters: videoFormat;

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

type TMergeByFiltersBodyDto = InstanceType<typeof MergeByFiltersBodyDto>;

export { MergeByFiltersBodyDto };
export type { TMergeByFiltersBodyDto };
