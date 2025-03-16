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

  async createDownloadReadable(
    url: string,
    itag: number,
    clients?: ClientEnum[],
    begin?: number,
  ): Promise<Readable> {
    const videoInfo = await this.getVideoInfo(url, clients);
    const currentFormat = videoInfo.formats.find(
      (format) => format.itag === itag,
    );
    if (!currentFormat) throw new Error('Invalid itag');
    return this.createStreamWithProgressTracking(url, currentFormat, begin);
  }

  async createDownloadStampReadable(
    url: string,
    itag: number,
    begin: number,
    clients?: ClientEnum[],
  ): Promise<Readable> {
    const videoInfo = await this.getVideoInfo(url, clients);
    const currentFormat = videoInfo.formats.find(
      (format) => format.itag === itag,
    );
    if (!currentFormat) throw new Error('Invalid itag');
    return ytdl(url, {
      format: currentFormat,
      highWaterMark: 1024 * 64,
      begin: `${begin}s`,
    });
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

  private createStreamWithProgressTracking(
    url: string,
    currentFormat: ytdl.videoFormat,
    begin?: number,
  ): Readable {
    const downloadStream = ytdl(url, {
      format: currentFormat,
      highWaterMark: 1024 * 64,
      begin: begin,
    });

    let downloadedBytes = 0;
    const totalBytes = parseInt(currentFormat.contentLength, 10);

    downloadStream.on('data', (chunk: Buffer) => {
      downloadedBytes += chunk.length;
      this.logDownloadProgress(downloadedBytes, totalBytes);
    });

    downloadStream.on('end', () => {
      console.log('Download complete!');
    });

    downloadStream.on('error', (error) => {
      console.error(`Download error: ${error.message}`);
    });

    return downloadStream;
  }
}

export { YtdlService };
