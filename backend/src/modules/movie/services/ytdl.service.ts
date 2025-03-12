import { Injectable } from '@nestjs/common';
import ytdl, {
  type videoFormat,
  type videoInfo,
  getInfo,
  validateURL,
  chooseFormat,
} from '@distube/ytdl-core';
import fs from 'fs';

@Injectable()
class YtdlService {
  async getVideoInfo(url: string): Promise<videoInfo> {
    const info = await getInfo(url);
    return info;
  }

  validateURL(url: string): boolean {
    return validateURL(url);
  }

  async getFormats(ytUrl: string) {
    const info = await this.getVideoInfo(ytUrl);
    const audio = info.formats.filter((f) => f.hasAudio);
    const video = info.formats.filter((f) => f.hasVideo);
    const both = info.formats.filter((f) => f.hasAudio && f.hasVideo);
    return { audio, video, both };
  }

  async downloadBasic(ytUrl: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const videoDownload = ytdl(ytUrl);
      const stream = fs.createWriteStream('video.mp4');
      videoDownload.pipe(stream);
      videoDownload.on('end', () => {
        resolve();
      });
      videoDownload.on('error', (error) => {
        stream.destroy();
        reject(error);
      });
    });
  }

  async downloadFromItag(ytUrl: string, itag: number): Promise<void> {
    const info = await this.getVideoInfo(ytUrl);
    const currentFormat = info.formats.find((format) => format.itag === itag);
    if (currentFormat === undefined) throw new Error('No Itag found');

    return new Promise<void>((resolve, reject) => {
      const videoDownload = ytdl(ytUrl, { format: currentFormat });
      const stream = fs.createWriteStream('video.mp4');
      videoDownload.pipe(stream);

      let downloadedBytes = 0;
      const totalBytes = parseInt(currentFormat.contentLength, 10);

      videoDownload.on('data', (chunk: Buffer) => {
        downloadedBytes += chunk.length;

        if (totalBytes) {
          const percentage = ((downloadedBytes / totalBytes) * 100).toFixed(2);
          console.log(`Downloaded ${downloadedBytes} bytes (${percentage}%)`);
        } else {
          console.log(`Downloaded ${downloadedBytes} bytes`);
        }
      });

      videoDownload.on('end', () => {
        console.log('-- Download complete!');
        resolve();
      });

      videoDownload.on('error', (error) => {
        stream.destroy();
        reject(error);
      });
    });
  }
}

export { YtdlService };
