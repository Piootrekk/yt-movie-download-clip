import { Injectable } from '@nestjs/common';
import { YtdlpService } from 'src/core/download-manager/ytdlp.service';
import type { TBaseQueryDto } from '../../base-dto/query.dto';
import { MovieInfoMapper } from './movie-info.mapper';
import { TFiltersResponseDto } from './dto/filters-response.dto';

@Injectable()
class MovieInfoService {
  constructor(
    private ytdlpService: YtdlpService,
    private movieInfoMapper: MovieInfoMapper,
  ) {}
  async getFormats({
    url,
    clients,
  }: TBaseQueryDto): Promise<TFiltersResponseDto> {
    const formats = await this.ytdlpService.getFormats(url, clients);
    const mappedFormats = {
      audio: formats.audio.map((audio) =>
        this.movieInfoMapper.transformReturn(audio),
      ),
      video: formats.video.map((video) =>
        this.movieInfoMapper.transformReturn(video),
      ),
      both: formats.both.map((both) =>
        this.movieInfoMapper.transformReturn(both),
      ),
    };
    return mappedFormats;
  }
}

export { MovieInfoService };
