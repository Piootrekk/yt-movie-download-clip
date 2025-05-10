import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { videoFormat } from '@distube/ytdl-core';
import { TrimmedBaseBodyDto } from './trimmed-filters-body.dto';

class MergeByFiltersBodyDto extends TrimmedBaseBodyDto {
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
  videoFilters: videoFormat;

  @ApiProperty({
    type: Object,
  })
  @IsObject()
  audioFilters: videoFormat;
}

type TMergeByFiltersBodyDto = InstanceType<typeof MergeByFiltersBodyDto>;

export { MergeByFiltersBodyDto };
export type { TMergeByFiltersBodyDto };
