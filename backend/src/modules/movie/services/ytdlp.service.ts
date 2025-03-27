import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import { Injectable } from '@nestjs/common';
import { ClientEnum } from '../movie.dto';
import { PassThrough, Readable } from 'stream';

@Injectable()
class YtDlpService {
  getVideoByItag(
    url: string,
    itag: string,
    clients: ClientEnum[] = [ClientEnum.WEB],
  ): Readable {
    const clientArgs = clients.join(',');
    const ytdlpChildProcess = spawn('yt-dlp', [
      '-f',
      itag,
      '-o',
      '-',
      '--extractor-args',
      `youtube:client=${clientArgs}`,
      url,
    ]);
    this.validateErrorsChildProcess(ytdlpChildProcess);
    return ytdlpChildProcess.stdout;
  }

  async getFilters(url: string) {
    return new Promise((resolve, reject) => {
      const ytdlpChildProcess = spawn('yt-dlp', ['-J', url]);
      ytdlpChildProcess.on('close', (code) => {
        if (code !== 0) {
          reject(new Error(`yt-dlp exited with code ${code}`));
        }
      });
    });
  }

  private validateErrorsChildProcess(
    childProcess: ChildProcessWithoutNullStreams,
  ): void {
    childProcess.stderr.on('data', (data) => {
      const message: string = data.toString();
      if (message.includes('ERROR:')) {
        childProcess.kill();
        throw new Error(`yt-dlip failed ${message}`);
      }
    });

    childProcess.on('error', (err) => {
      throw new Error(`Failed to start yt-dlp: ${err.message}`);
    });

    childProcess.on('close', (code) => {
      if (code !== 0) {
        throw new Error(`yt-dlp exited with code ${code}`);
      }
    });
  }
}

export { YtDlpService };
