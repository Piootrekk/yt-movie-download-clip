import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import { Injectable } from '@nestjs/common';
import { ClientEnum } from '../movie.dto';
import { Readable } from 'stream';

type TYtDlpFilters = {
  format_id: string;
  ext: string;
};

type TFilters = {
  audio: TYtDlpFilters[];
  video: TYtDlpFilters[];
  both: TYtDlpFilters[];
};

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

  async getFilters(
    url: string,
    clients: ClientEnum[] = [ClientEnum.WEB],
  ): Promise<TFilters> {
    const clientArgs = clients.join(',');
    return new Promise((resolve, reject) => {
      const ytdlpChildProcess = spawn('yt-dlp', [
        '-J',
        url,
        '--skip-download',
        '--extractor-args',
        `youtube:client=${clientArgs}`,
      ]);
      let rawText = '';
      ytdlpChildProcess.stdout.on('data', (data) => {
        rawText += data.toString();
      });
      ytdlpChildProcess.on('close', (code) => {
        if (code !== 0) {
          reject(new Error(`yt-dlp exited with code ${code}`));
        } else {
          const jsonDump = JSON.parse(rawText);
          const onlyAudio: TYtDlpFilters[] = jsonDump.formats
            ?.filter(
              (filter) => (format) =>
                format.vcodec === 'none' && format.acodec !== 'none',
            )
            .map((format) => ({ id: format.format_id, ext: format.ext }));
          const onlyVideo: TYtDlpFilters[] = jsonDump.formats
            ?.filter(
              (filter) => (format) =>
                format.vcodec !== 'none' && format.acodec === 'none',
            )
            .map((format) => ({ id: format.format_id, ext: format.ext }));
          const videoWithAudio: TYtDlpFilters[] = jsonDump.formats
            ?.filter(
              (filter) => (format) =>
                format.vcodec !== 'none' && format.acodec !== 'none',
            )
            .map((format) => ({ id: format.format_id, ext: format.ext }));

          resolve({ audio: onlyAudio, video: onlyVideo, both: videoWithAudio });
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
