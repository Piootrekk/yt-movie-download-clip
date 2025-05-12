import { Injectable } from '@nestjs/common';
import { YtdlpService } from 'src/core/download-manager/ytdlp.service';
import type { TBaseQueryDto } from '../../base-dto/query.dto';

@Injectable()
class MovieInfoService {
  constructor(private ytdlpService: YtdlpService) {}
  async getFormats({ url, clients }: TBaseQueryDto) {
    return this.ytdlpService.getFormats(url, clients);
  }
}

export { MovieInfoService };
