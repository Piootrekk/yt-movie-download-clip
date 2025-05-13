import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IsObject } from 'class-validator';
import { BaseQueryDto } from 'src/modules/yt-movies/base-dto/query.dto';
import { TrimmedBaseBodyDto } from 'src/modules/yt-movies/base-dto/trimmed-filters-body.dto';
import { TFiltersItemDto } from '../../movie-info/dto/filters-response.dto';

class MergedBodyDto extends IntersectionType(BaseQueryDto, TrimmedBaseBodyDto) {
  @ApiProperty({
    type: Object,
  })
  @IsObject()
  videoFilters: TFiltersItemDto;

  @ApiProperty({
    type: Object,
  })
  @IsObject()
  audioFilters: TFiltersItemDto;
}

type TMergedBodyDto = InstanceType<typeof MergedBodyDto>;

export { MergedBodyDto };
export type { TMergedBodyDto };
