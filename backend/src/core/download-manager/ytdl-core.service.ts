import { Injectable } from '@nestjs/common';
import { ClientEnum } from './types/ytdl-core.enum';
import ytdl from '@distube/ytdl-core';
import { Readable } from 'stream';
import type { videoFormat } from '@distube/ytdl-core';
import { TFilters } from './types/ytdlp.types';

/**
 * Service that utilizes the {@link https://github.com/distubejs/ytdl-core | @distube/ytdl-core} package.
 *
 * Provides wrapper methods for fetching video information and downloading videos from YouTube.
 */

@Injectable()
class YtdlCoreService {
  validateURL(url: string) {
    return ytdl.validateURL(url);
  }

  async getFormats(url: string, clients?: ClientEnum[]) {
    const { formats } = await ytdl.getInfo(url, { playerClients: clients });
    const seenFormats = new Map<string, boolean>();
    const sortedFormats: TFilters = {
      video: [],
      audio: [],
      both: [],
    };
    for (const format of formats) {
      const key = format.audioTrack
        ? `${format.itag}-${format.audioTrack.displayName}`
        : `${format.itag}`;

      if (!seenFormats.has(key)) {
        seenFormats.set(key, true);
        if (format.hasAudio && format.hasVideo) sortedFormats.both.push(format);
        else if (format.hasAudio) sortedFormats.audio.push(format);
        else if (format.hasVideo) sortedFormats.video.push(format);
      }
    }
    return sortedFormats;
  }

  async getFormatByItag(
    url: string,
    itag: number,
    clients?: ClientEnum[],
  ): Promise<videoFormat> {
    const { formats } = await ytdl.getInfo(url, { playerClients: clients });
    const currentFormat = formats.find((format) => format.itag === itag);
    if (currentFormat === undefined) throw new Error('Format not found');
    return currentFormat;
  }

  createStream(
    url: string,
    currentFormat: videoFormat,
    sizeChunk?: number,
  ): Readable {
    const kb64 = 1024 * 64;
    return ytdl(url, {
      format: currentFormat,
      highWaterMark: sizeChunk || kb64,
    });
  }
}

export { YtdlCoreService };
