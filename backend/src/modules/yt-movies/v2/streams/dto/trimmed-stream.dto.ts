import { IntersectionType } from '@nestjs/swagger';
import { TrimmedBaseBodyDto } from 'src/modules/yt-movies/base-dto/trimmed-filters-body.dto';
import { StreamByItagBodyDto } from './stream-itag-body.dto';

class TrimmedBodyDto extends IntersectionType(
  TrimmedBaseBodyDto,
  StreamByItagBodyDto,
) {}

type TTrimmedBodyDto = InstanceType<typeof TrimmedBodyDto>;

export { TrimmedBodyDto };
export type { TTrimmedBodyDto };
