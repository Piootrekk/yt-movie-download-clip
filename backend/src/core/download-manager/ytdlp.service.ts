import { Injectable } from '@nestjs/common';
import { ClientEnum } from './types/ytdl-core.enum';
import { spawn } from 'child_process';
import { TYtdlpInfo } from './types/ytdlp.types';

/**
 * Service that utilizes the {@link https://github.com/yt-dlp/yt-dlp | yt-dlp} package.
 *
 * Provides wrapper methods that use system commands to fetch video information and download videos from YouTube.
 *
 * Requires Python to be installed on the operating system.
 */

@Injectable()
class YtdlpService {
  private runCommand = 'yt-dlp';
  async getFormats(url: string, client?: ClientEnum[]) {
    return new Promise((resolve, reject) => {
      const args = ['-J', url, '--skip-download'];
      if (client) {
        const clientArgs = client.join(',');
        args.push(`-extractor-args youtube:client=${clientArgs}`);
      }
      const ytdlp = spawn(this.runCommand, args);

      let stdout = '';
      let stderr = '';

      ytdlp.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      ytdlp.stderr.on('data', (data) => {
        stderr += data.toString();
      });
      ytdlp.on('close', (code) => {
        if (code !== 0)
          reject(new Error(`yt-dlp exited with code ${code}: ${stderr}`));

        const result: TYtdlpInfo = JSON.parse(stdout);
        resolve(result);
      });
    });
  }
}

export { YtdlpService };
