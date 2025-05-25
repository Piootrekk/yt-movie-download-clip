import { Injectable } from '@nestjs/common';
import { ClientEnum } from './types/ytdl-core.enum';
import { spawn } from 'child_process';
import type {
  TFiltersGroup,
  TYtDlpFormat,
  TYtdlpInfo,
} from './types/ytdlp.types';
import type { Readable } from 'stream';

/**
 * Service that utilizes the {@link https://github.com/yt-dlp/yt-dlp | yt-dlp} package.
 *
 * Provides wrapper methods that use system commands to fetch video information and download videos from YouTube.
 *
 * Requires Python to be installed on the operating system.
 */

@Injectable()
class YtdlpService {
  private ytdlpCommand = 'yt-dlp';

  async getFormats(
    url: string,
    clients?: ClientEnum[],
  ): Promise<TFiltersGroup> {
    const args = ['-J', url, '--skip-download'];
    if (clients && clients.length > 0) {
      const clientArgs = clients.join(',');
      args.push(`-extractor-args youtube:client=${clientArgs}`);
    }
    return new Promise((resolve, reject) => {
      const childProcess = spawn(this.ytdlpCommand, args);

      let stdout = '';
      let stderr = '';

      childProcess.stdout.on('data', (data: string) => {
        stdout += data.toString();
      });

      childProcess.stderr.on('data', (data: string) => {
        stderr += data.toString();
      });
      childProcess.on('close', (code) => {
        if (code !== 0)
          reject(
            new Error(
              `yt-dlp error in fetching formats with code ${code}: ${stderr}`,
            ),
          );

        const result = JSON.parse(stdout) as TYtdlpInfo;
        const categorizedFormats = this.categorizeFormats(result.formats);
        resolve(categorizedFormats);
      });
    });
  }

  createStreamById(url: string, id: string, clients?: ClientEnum[]): Readable {
    const args = ['-f', id, url, '-o', '-'];
    if (clients && clients.length > 0) {
      const clientArgs = clients.join(',');
      args.push(`-extractor-args youtube:client=${clientArgs}`);
    }
    let stderr = '';

    const subProcess = spawn(this.ytdlpCommand, args);
    subProcess.stderr.on('data', (data: string) => {
      stderr += data.toString();
    });
    subProcess.on('close', (code) => {
      if (code !== 0) {
        new Error(`yt-dlp exited with code ${code}: ${stderr}`);
      }
    });
    return subProcess.stdout;
  }

  private categorizeFormats(formats: TYtDlpFormat[]): TFiltersGroup {
    const audio: TYtDlpFormat[] = [];
    const video: TYtDlpFormat[] = [];
    const both: TYtDlpFormat[] = [];
    const seenFormats = new Map<string, boolean>();

    for (const format of formats) {
      const key = format.format_id;
      if (!seenFormats.has(key)) {
        seenFormats.set(key, true);
        if (format.audio_ext !== 'none' && format.video_ext !== 'none')
          both.push(format);
        else if (format.audio_ext !== 'none') audio.push(format);
        else if (format.video_ext !== 'none') video.push(format);
        else if (format.video_ext === 'none' && format.audio_ext === 'none')
          both.push(format);
      }
    }
    return { audio, video, both };
  }
}

export { YtdlpService };
