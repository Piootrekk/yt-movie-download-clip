import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
import { BaseQueryDto } from 'src/modules/yt-movies/base-dto/query.dto';

class SelectedFiltersDto extends BaseQueryDto {
  @ApiProperty({
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  selected: string[];
}

export { SelectedFiltersDto };
