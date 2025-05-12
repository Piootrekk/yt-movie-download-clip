import { Injectable } from '@nestjs/common';
import { YtdlpService } from 'src/core/download-manager/ytdlp.service';
import { TStreamByItagQuery } from './dto/stream-itag-query.dto';

@Injectable()
class StreamService {
  constructor(private ytdlpService: YtdlpService) {}

  getStream({ url, itag, clients }: TStreamByItagQuery) {
    return this.ytdlpService.createStreamById(url, itag, clients);
  }
}

export { StreamService };
