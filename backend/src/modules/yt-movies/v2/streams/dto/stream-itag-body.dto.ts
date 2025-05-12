import { ApiProperty } from '@nestjs/swagger';
import { IsObject } from 'class-validator';
import { TYtDlpFormat } from 'src/core/download-manager/types/ytdlp.types';
import { BaseQueryDto } from 'src/modules/yt-movies/base-dto/query.dto';

class StreamByItagBodyDto extends BaseQueryDto {
  @ApiProperty({
    type: Object,
  })
  @IsObject()
  filters: TYtDlpFormat;
}

type TStreamByItagBody = InstanceType<typeof StreamByItagBodyDto>;

export { StreamByItagBodyDto };
export type { TStreamByItagBody as TStreamByItagQuery };
