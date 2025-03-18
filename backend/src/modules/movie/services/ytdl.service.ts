// https://singh-sandeep.medium.com/download-youtube-videos-from-node-js-3a0b05d42269 some explains

import { Injectable } from '@nestjs/common';
import ytdl, { type videoInfo, getInfo, validateURL } from '@distube/ytdl-core';
import { ClientEnum } from '../movie.dto';
import { Readable } from 'stream';

@Injectable()
class YtdlService {
  async getVideoInfo(url: string, clients?: ClientEnum[]): Promise<videoInfo> {
    const info = await getInfo(url, { playerClients: clients });
    return info;
  }

  validateURL(url: string): boolean {
    return validateURL(url);
  }

  async getFormats(ytUrl: string, clients?: ClientEnum[]) {
    const info = await this.getVideoInfo(ytUrl, clients);
    const audio = info.formats.filter((f) => f.hasAudio);
    const video = info.formats.filter((f) => f.hasVideo);
    const both = info.formats.filter((f) => f.hasAudio && f.hasVideo);
    return { audio, video, both };
  }

  async getFormatByItag(
    url: string,
    itag: number,
    clients?: ClientEnum[],
  ): Promise<ytdl.videoFormat> {
    const videoInfo = await this.getVideoInfo(url, clients);
    const currentFormat = videoInfo.formats.find(
      (format) => format.itag === itag,
    );
    if (!currentFormat) throw new Error('Invalid itag');
    return currentFormat;
  }

  createDownloadReadable(
    url: string,
    currentFormat: ytdl.videoFormat,
    progressTrack: boolean = false,
  ): Readable {
    const stream = this.createStream(url, currentFormat);
    if (progressTrack) this.attatchProgressTracking(currentFormat, stream);
    return stream;
  }

  private logDownloadProgress(
    downloadedBytes: number,
    totalBytes: number,
  ): void {
    if (totalBytes) {
      const percentage = ((downloadedBytes / totalBytes) * 100).toFixed(2);
      console.log(`Downloaded ${downloadedBytes} bytes (${percentage}%)`);
    } else {
      console.log(`Downloaded ${downloadedBytes} bytes`);
    }
  }

  private createStream(
    url: string,
    currentFormat: ytdl.videoFormat,
    sizeChunk?: number,
  ): Readable {
    return ytdl(url, {
      format: currentFormat,
      highWaterMark: sizeChunk || 1024 * 64,
    });
  }

  private attatchProgressTracking(
    currentFormat: ytdl.videoFormat,
    stream: Readable,
  ): void {
    let downloadedBytes = 0;
    const totalBytes = parseInt(currentFormat.contentLength, 10);

    stream.on('data', (chunk: Buffer) => {
      downloadedBytes += chunk.length;
      this.logDownloadProgress(downloadedBytes, totalBytes);
    });

    stream.on('end', () => {
      console.log('Download complete!');
    });

    stream.on('error', (error) => {
      console.error(`Download error: ${error.message}`);
    });
  }
}

export { YtdlService };
