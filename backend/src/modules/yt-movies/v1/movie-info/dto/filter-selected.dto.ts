import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
import { BaseQueryDto } from 'src/modules/yt-movies/base-dto/query.dto';

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

type TSelectedFiltersDto = InstanceType<typeof SelectedFiltersDto>;

export { SelectedFiltersDto };

export type { TSelectedFiltersDto };
