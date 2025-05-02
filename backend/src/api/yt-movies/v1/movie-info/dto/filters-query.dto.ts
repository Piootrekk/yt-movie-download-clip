import { BaseQueryDto } from '../../dto/base.dto';

class FiltersQueryDto extends BaseQueryDto {}

type TFiltersQueryDto = InstanceType<typeof FiltersQueryDto>;

export { FiltersQueryDto };
export type { TFiltersQueryDto };
