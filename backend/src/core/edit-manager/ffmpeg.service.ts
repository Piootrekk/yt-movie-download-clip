import { Injectable } from '@nestjs/common';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import ffmpeg from 'fluent-ffmpeg';
import { env } from 'src/shared/env';
import { PassThrough, Readable } from 'stream';

/**
 * Service that utilizes the {@link https://www.ffmpeg.org/ | ffmpeg} solution.
 *
 * Provides wrapper methods that use system commands to fetch video information and download videos from YouTube.
 *
 * Requires ffmpeg to be installed on the operating system.
 */
@Injectable()
class FfmpegService {
  constructor() {
    this.setPath();
  }

  protected setPath(): void {
    const envPath = env.getFfmpegPath();
    ffmpeg.setFfmpegPath(envPath || ffmpegInstaller.path);
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

  mergedAudioVideoToStream(
    videoFilePath: string,
    audioFilePath: string,
    startTimeInSec: string,
    durationTimeInSec: number,
  ): Readable {
    const passThrough = new PassThrough();
    const command = ffmpeg()
      .input(videoFilePath)
      .seekInput(startTimeInSec)
      .videoCodec('copy')
      .input(audioFilePath)
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
