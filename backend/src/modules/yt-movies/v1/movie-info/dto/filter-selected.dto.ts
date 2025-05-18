import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
import { BaseQueryDto } from 'src/modules/yt-movies/base-dto/query.dto';
import { TPrettify } from 'src/shared/types/prettify';

class SelectedFiltersDto extends BaseQueryDto {
  @ApiProperty({
    type: [String],
    description:
      'List of property names to include in the result (e.g., "bitrate"])',
    example: ['itag', 'audioCodec', 'videoCodec', 'container'],
  })
  @IsArray()
  @IsString({ each: true })
  selected: string[];
}

type TSelectedFiltersDto = TPrettify<InstanceType<typeof SelectedFiltersDto>>;

export { SelectedFiltersDto };

export type { TSelectedFiltersDto };
