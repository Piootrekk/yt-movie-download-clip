import { Injectable } from '@nestjs/common';
import { ClientEnum } from 'src/core/download-manager/declare-types/ytdl-core.enum';
import { YtdlCoreService } from 'src/core/download-manager/ytdl-core.service';

@Injectable()
class MovieInfoService {
  constructor(private ytdlCoreService: YtdlCoreService) {}
  async getFormats(url: string, clients?: ClientEnum[]) {
    return this.ytdlCoreService.getFormats(url, clients);
  }
}

export { MovieInfoService };
