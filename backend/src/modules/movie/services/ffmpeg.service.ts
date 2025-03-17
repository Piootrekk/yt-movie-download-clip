import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import { Injectable } from '@nestjs/common';
import ffmpeg from 'fluent-ffmpeg';
import { PassThrough, Readable } from 'stream';

@Injectable()
class FfmpegService {
  constructor() {
    this.setPath();
  }

  protected setPath(): void {
    ffmpeg.setFfmpegPath(ffmpegInstaller.path);
  }

  getVersion(): void {
    console.log(
      `Version: ${ffmpegInstaller.version}, Path: ${ffmpegInstaller.path}`,
    );
  }

  async trimVideoToFile(
    stream: Readable,
    startTimeInSec: string,
    durationTimeInSec: number,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      ffmpeg(stream)
        .setStartTime(startTimeInSec)
        .setDuration(durationTimeInSec)
        .output('videovxcvscasxcvxcvxcv.mp4')
        .on('end', () => {
          console.log('FFMPEG PROCESS END');
          resolve();
        })
        .on('error', (err) => {
          console.log('FFMPEG ERROR', err);
          reject(err);
        })
        .run();
    });
  }

  async trimVideoToStream(
    stream: Readable,
    startTimeInSec: string,
    durationTimeInSec: number,
  ): Promise<Readable> {
    return new Promise((resolve, reject) => {
      const outputStream = new PassThrough();
      ffmpeg(stream)
        .setStartTime(startTimeInSec)
        .setDuration(durationTimeInSec)
        .format('mp4')
        .on('error', (err) => {
          console.error('FFMPEG ERROR:', err);
          reject(err);
        })
        .pipe(outputStream, { end: true });

      resolve(outputStream);
    });
  }
}

export { FfmpegService };
