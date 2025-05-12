import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IsObject } from 'class-validator';
import { TYtDlpFormat } from 'src/core/download-manager/types/ytdlp.types';
import { BaseQueryDto } from 'src/modules/yt-movies/base-dto/query.dto';
import { TrimmedBaseBodyDto } from 'src/modules/yt-movies/base-dto/trimmed-filters-body.dto';

class MergedBodyDto extends IntersectionType(BaseQueryDto, TrimmedBaseBodyDto) {
  @ApiProperty({
    type: Object,
  })
  @IsObject()
  videoFilters: TYtDlpFormat;

  @ApiProperty({
    type: Object,
  })
  @IsObject()
  audioFilters: TYtDlpFormat;
}

type TMergedBodyDto = InstanceType<typeof MergedBodyDto>;

export { MergedBodyDto };
export type { TMergedBodyDto };
