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

  getVersion(): string {
    return `Version: ${ffmpegInstaller.version}, Path: ${ffmpegInstaller.path}`;
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

  trimVideoToStream(
    inputStream: Readable,
    startTimeInSec: string,
    durationTimeInSec: number,
  ): Readable {
    const passThrough = new PassThrough();
    const command = ffmpeg(inputStream)
      .seekInput(startTimeInSec)
      .setDuration(durationTimeInSec)
      .format('mp4')
      .outputOptions('-movflags frag_keyframe+empty_moov');
    command.pipe(passThrough);
    passThrough
      .on('start', (cmd) => console.log('FFmpeg command:', cmd))
      .on('error', (err) => {
        console.error('FFmpeg error:', err.message);
        inputStream.destroy(err);
        throw new Error(err.message);
      })
      .on('end', () => {
        console.log('Trimming finished.');
      });
    return passThrough;
  }

  mergeAudioVideoToFile(videoPath: string, audioPath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const command = ffmpeg()
        .input(videoPath)
        .videoCodec('copy')
        .input(audioPath)
        .audioCodec('aac')
        .output('both.mp4')
        .on('end', () => resolve())
        .on('error', reject);
      command.run();
    });
  }

  mergedAudioVideoToStream(
    videoPath: string,
    audioPath: string,
    startTimeInSec: string,
    durationTimeInSec: number,
  ): Readable {
    const passThrough = new PassThrough();
    const command = ffmpeg()
      .input(videoPath)
      .seekInput(startTimeInSec)
      .videoCodec('copy')
      .input(audioPath)
      .seekInput(startTimeInSec)
      .audioCodec('aac')
      .format('mp4')
      .duration(durationTimeInSec)
      .outputOptions('-movflags frag_keyframe+empty_moov');
    command.pipe(passThrough, { end: true });
    passThrough
      .on('start', (cmd) => console.log('FFmpeg command:', cmd))
      .on('end', () => {
        console.log('Trimming finished.');
      });
    return passThrough;
  }
}

export { FfmpegService };
