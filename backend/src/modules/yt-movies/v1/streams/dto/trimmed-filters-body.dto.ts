import { IntersectionType } from '@nestjs/swagger';
import { AllByFiltersBodyDto } from './all-filters-body.dto';
import { TrimmedBaseBodyDto } from 'src/modules/yt-movies/base-dto/trimmed-filters-body.dto';

class TrimmedFiltersBodyDto extends IntersectionType(
  AllByFiltersBodyDto,
  TrimmedBaseBodyDto,
) {}

type TTrimmedFiltersBodyDto = InstanceType<typeof TrimmedFiltersBodyDto>;

export { TrimmedFiltersBodyDto, TrimmedBaseBodyDto };

export type { TTrimmedFiltersBodyDto };
