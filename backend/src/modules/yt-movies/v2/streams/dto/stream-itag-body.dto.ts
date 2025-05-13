import { ApiProperty } from '@nestjs/swagger';
import { IsObject } from 'class-validator';
import { BaseQueryDto } from 'src/modules/yt-movies/base-dto/query.dto';
import { TFiltersItemDto } from '../../movie-info/dto/filters-response.dto';

class StreamByItagBodyDto extends BaseQueryDto {
  @ApiProperty({
    type: Object,
  })
  @IsObject()
  filters: TFiltersItemDto;
}

type TStreamByItagBody = InstanceType<typeof StreamByItagBodyDto>;

export { StreamByItagBodyDto };
export type { TStreamByItagBody as TStreamByItagQuery };
