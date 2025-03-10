import { Injectable } from '@nestjs/common';
import ytdl, {
  type videoFormat,
  type videoInfo,
  getInfo,
  validateURL,
  chooseFormat,
  downloadFromInfo,
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

  selectFormat(formats: videoFormat[], quality: string) {
    //  @TODO validate quality if exist in itag
    return chooseFormat(formats, { quality });
  }

  async download(ytUrl: string): Promise<void> {
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

  downloadFromInfo(info: videoInfo, format: videoFormat) {
    const download = downloadFromInfo(info, { format });
    return download;
  }
}

export { YtdlService };
