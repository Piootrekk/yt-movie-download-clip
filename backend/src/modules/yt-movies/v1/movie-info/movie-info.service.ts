import { Injectable } from '@nestjs/common';
import { YtdlCoreService } from 'src/core/download-manager/ytdl-core.service';
import type { TBaseQueryDto } from '../../base-dto/query.dto';
import type { TSelectedFiltersDto } from './dto/filter-selected.dto';
import type { TFiltersResponse } from './dto/filters-response.dto';

@Injectable()
class MovieInfoService {
  constructor(private ytdlCoreService: YtdlCoreService) {}

  async getFormats({ url, clients }: TBaseQueryDto): Promise<TFiltersResponse> {
    return this.ytdlCoreService.getFormats(url, clients);
  }

  async getSelectedFormats({ url, clients, selected }: TSelectedFiltersDto) {
    const formats = await this.ytdlCoreService.getFormats(url, clients);

    const filterFields = <T extends object>(
      items: T[],
      selected: string[],
    ): Partial<T>[] => {
      return items.map((item) =>
        selected.reduce((acc: Partial<T>, key) => {
          if (key in item) acc[key as keyof T] = item[key as keyof T];
          return acc;
        }, {}),
      );
    };
    return {
      audio: filterFields(formats.audio || [], selected),
      video: filterFields(formats.video || [], selected),
      both: filterFields(formats.both || [], selected),
    };
  }
}

export { MovieInfoService };
