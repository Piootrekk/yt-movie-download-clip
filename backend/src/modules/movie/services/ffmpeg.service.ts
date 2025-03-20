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

  trimVideoToStream(
    inputStream: Readable,
    startTimeInSec: string,
    durationTimeInSec: number,
  ) {
    const passThrough = new PassThrough();
    const command = ffmpeg(inputStream)
      .setStartTime(startTimeInSec)
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

  margeAudioToVideo(
    videoStream: Readable,
    audioStream: Readable,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      ffmpeg()
        .input(videoStream)
        .inputFormat('mp4')
        .input(audioStream)
        .inputFormat('mp3')
        .complexFilter(['[0:v][1:a]amerge=inputs=1[out]'])
        .map('[out]')
        .output('tasd.mp4')
        .on('end', () => resolve())
        .on('error', reject)
        .run();
    });
  }
}

export { FfmpegService };
