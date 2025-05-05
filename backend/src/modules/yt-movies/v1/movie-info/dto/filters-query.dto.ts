import { BaseQueryDto } from '../../../base-dto/query.dto';

class FiltersQueryDto extends BaseQueryDto {}

type TFiltersQueryDto = InstanceType<typeof FiltersQueryDto>;

export { FiltersQueryDto };
export type { TFiltersQueryDto };
