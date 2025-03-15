import { Injectable } from '@nestjs/common';
import ytdl, { type videoInfo, getInfo, validateURL } from '@distube/ytdl-core';
import fs from 'fs';
import { FastifyReply } from 'fastify';
import { ClientEnum } from '../movie.dto';

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

  async downloadFromItag(
    ytUrl: string,
    itag: number,
    reply: FastifyReply,
    clients?: ClientEnum[],
  ): Promise<void> {
    const info = await this.getVideoInfo(ytUrl, clients);
    const currentFormat = info.formats.find((format) => format.itag === itag);
    if (currentFormat === undefined) throw new Error('No Itag found');

    return new Promise<void>((resolve, reject) => {
      const videoDownload = ytdl(ytUrl, {
        format: currentFormat,
        highWaterMark: 1024 * 64,
      });
      let downloadedBytes = 0;
      const totalBytes = parseInt(currentFormat.contentLength, 10);

      // videoDownload.pipe(reply.raw);
      videoDownload.on('data', (chunk: Buffer) => {
        reply.raw.write(chunk);
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
        reply.raw.end();
        resolve();
      });

      videoDownload.on('error', (error) => {
        reply.raw.destroy();
        reject(error);
      });
    });
  }

  async downloadFromItagToFile(
    ytUrl: string,
    itag: number,
    clients?: ClientEnum[],
  ): Promise<void> {
    const info = await this.getVideoInfo(ytUrl, clients);
    const currentFormat = info.formats.find((format) => format.itag === itag);
    if (currentFormat === undefined) throw new Error('No Itag found');

    return new Promise<void>((resolve, reject) => {
      const videoDownload = ytdl(ytUrl, {
        format: currentFormat,
        highWaterMark: 1024 * 64,
      });
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
