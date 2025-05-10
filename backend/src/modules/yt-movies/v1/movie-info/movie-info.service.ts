import { Injectable } from '@nestjs/common';
import { ClientEnum } from 'src/core/download-manager/declare-types/ytdl-core.enum';
import { YtdlCoreService } from 'src/core/download-manager/ytdl-core.service';
import { TBaseQueryDto } from '../../base-dto/query.dto';

@Injectable()
class MovieInfoService {
  constructor(private ytdlCoreService: YtdlCoreService) {}
  async getFormats({ url, clients }: TBaseQueryDto) {
    return this.ytdlCoreService.getFormats(url, clients);
  }
}

export { MovieInfoService };
