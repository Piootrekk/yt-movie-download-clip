import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import { Injectable } from '@nestjs/common';
import { ClientEnum } from '../movie.dto';
import { Readable } from 'stream';

type TYtDlpFilters = {
  id: string;
  ext: string;
};

type TFilters = {
  audio: TYtDlpFilters[];
  video: TYtDlpFilters[];
  both: TYtDlpFilters[];
};

type TJsonDump = Record<string, string> & {
  formats: {
    vcodec: string;
    acodec: string;
    ext: string;
    format_id: string;
  } & Record<string, string>[];
};

@Injectable()
class YtDlpService {
  getVideoById(
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
          const jsonDump: TJsonDump = JSON.parse(rawText);
          const onlyAudio = this.getVideoTypeFromJson(jsonDump, false, true);
          const onlyVideo = this.getVideoTypeFromJson(jsonDump, true, false);
          const both = this.getVideoTypeFromJson(jsonDump, false, false);
          resolve({ audio: onlyAudio, video: onlyVideo, both: both });
        }
      });
    });
  }

  /**
   * Filters video formats from a JSON dump based on video and audio codec availability.
   *
   * @param jsonDump The JSON object containing format information `yt-dpl -J link`.
   * @param vcodec If `true`, includes formats with video; if `false`, includes formats without video.
   * @param acodec If `true`, includes formats with audio; if `false`, includes formats without audio.
   * @returns  An array of filtered formats with `id` and `ext` properties.
   */

  private getVideoTypeFromJson(
    jsonDump: TJsonDump,
    vcodec: boolean,
    acodec: boolean,
  ): TYtDlpFilters[] {
    if (!jsonDump.formats) {
      throw new Error('No formats found');
    }
    return jsonDump.formats
      .filter((format) => {
        const hasVideo = vcodec
          ? format.vcodec !== 'none'
          : format.vcodec === 'none';
        const hasAudio = acodec
          ? format.acodec !== 'none'
          : format.acodec === 'none';

        return hasVideo && hasAudio;
      })
      .map((format) => ({
        id: format.format_id,
        ext: format.ext,
      }));
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
