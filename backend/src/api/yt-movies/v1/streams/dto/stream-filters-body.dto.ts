import { videoFormat } from '@distube/ytdl-core';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsUrl } from 'class-validator';

class StreamByFiltersBodyDto {
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
  filters: videoFormat;
}

type TStreamByFiltersBodyDto = InstanceType<typeof StreamByFiltersBodyDto>;

export { StreamByFiltersBodyDto };
export type { TStreamByFiltersBodyDto };
