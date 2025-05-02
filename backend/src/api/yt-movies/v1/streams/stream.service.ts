import { videoFormat } from '@distube/ytdl-core';
import { Injectable } from '@nestjs/common';
import { YtdlCoreService } from 'src/core/download-manager/ytdl-core.service';
import { ClientEnum } from 'src/modules/movie/movie.dto';
import { Readable } from 'stream';

@Injectable()
class StreamService {
  constructor(private ytdlCoreService: YtdlCoreService) {}
  async getStreamById(
    url: string,
    itag: number,
    clients?: ClientEnum[],
    sizeChunk?: number,
  ): Promise<Readable> {
    const format = await this.ytdlCoreService.getFormatByItag(
      url,
      itag,
      clients,
    );
    const stream = this.ytdlCoreService.createStream(url, format, sizeChunk);
    return stream;
  }
  async streamVideo(
    url: string,
    format: videoFormat,
    sizeChunk?: number,
  ): Promise<Readable> {
    return this.ytdlCoreService.createStream(url, format, sizeChunk);
  }
}

export { StreamService };
