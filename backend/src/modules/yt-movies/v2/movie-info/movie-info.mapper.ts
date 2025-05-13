import { Injectable } from '@nestjs/common';
import { TYtDlpFormat } from 'src/core/download-manager/types/ytdlp.types';
import { TFiltersItemDto } from './dto/filters-response.dto';

@Injectable()
class MovieInfoMapper {
  transformReturn(filter: TYtDlpFormat): TFiltersItemDto {
    return {
      itag: filter.format_id,
      url: filter.url,
      container: filter.ext,
      audioCodec: filter.acodec,
      videoCodec: filter.vcodec,
      fps: filter.fps,
      width: filter.width,
      height: filter.height,
    } satisfies TFiltersItemDto;
  }
}

export { MovieInfoMapper };
