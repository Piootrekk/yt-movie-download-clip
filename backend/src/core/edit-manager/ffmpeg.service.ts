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

  private outputOptions = {
    /* MP4 ONLY - Makes streamable before fully written (needed for .pipe() to browser)*/
    streamable: '-movflags frag_keyframe+empty_moov',
    /*	If re-encoding video*/
    veryfast: '-preset veryfast',
    /*Audio encoding - sets target audio bitrate */
    targetAudioBitrate: '-b:a 128k',
    /* Stops encoding when shortest stream ends */
    shortest: '-shortest',
  };

  protected setPath(): void {
    const envPath = env.getFfmpegPath();
    ffmpeg.setFfmpegPath(envPath || ffmpegInstaller.path);
  }

  trimVideoToStream(
    inputStream: Readable,
    startTimeInSec: string,
    durationTimeInSec: number,
    format: string,
  ): Readable {
    const passThrough = new PassThrough();
    const command = ffmpeg(inputStream)
      .seekInput(startTimeInSec)
      .setDuration(durationTimeInSec)
      .format(format)
      .outputOptions(this.outputOptions.streamable);
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
    format: string,
  ): Readable {
    const passThrough = new PassThrough();
    const command = ffmpeg()
      .input(videoFilePath)
      .seekInput(startTimeInSec)
      .videoCodec('copy')
      .input(audioFilePath)
      .seekInput(startTimeInSec)
      .audioCodec('aac')
      .format(format)
      .duration(durationTimeInSec)
      .outputOptions(this.outputOptions.streamable);
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
