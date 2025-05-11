import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  BaseFilterContainerDto,
  FiltersVideoDto,
} from './filters-response.dto';
import { videoFormat } from '@distube/ytdl-core';
import { Type } from 'class-transformer';
import { IsArray, IsOptional } from 'class-validator';

class FiltersSelectedResponseDto {
  @ApiProperty({
    type: PartialType(BaseFilterContainerDto),
    isArray: true,
  })
  @IsArray()
  @IsOptional({ each: true })
  @Type(() => PartialType(BaseFilterContainerDto))
  audio: Partial<BaseFilterContainerDto>[];

  @ApiProperty({
    type: PartialType(FiltersVideoDto),
    isArray: true,
  })
  @IsArray()
  @IsOptional({ each: true })
  @Type(() => PartialType(FiltersVideoDto))
  video: Partial<FiltersVideoDto>[];

  @ApiProperty({
    type: PartialType(BaseFilterContainerDto),
    isArray: true,
  })
  @IsArray()
  @IsOptional({ each: true })
  @Type(() => PartialType(BaseFilterContainerDto))
  both: Partial<BaseFilterContainerDto>[];
}
type TFiltersSelectedResponseDto = {
  video: Partial<videoFormat>[];
  audio: Partial<videoFormat>[];
  both: Partial<videoFormat>[];
};

export { FiltersSelectedResponseDto };
export type { TFiltersSelectedResponseDto };
