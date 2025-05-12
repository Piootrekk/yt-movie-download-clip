import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { BaseQueryDto } from 'src/modules/yt-movies/base-dto/query.dto';

class StreamByItagQuery extends BaseQueryDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  itag: string;
}

type TStreamByItagQuery = InstanceType<typeof StreamByItagQuery>;

export { StreamByItagQuery };
export type { TStreamByItagQuery };
