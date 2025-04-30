import { Injectable } from '@nestjs/common';

/**
 * Service that utilizes the {@link https://github.com/yt-dlp/yt-dlp | yt-dlp} package.
 *
 * Provides wrapper methods that use system commands to fetch video information and download videos from YouTube.
 *
 * Requires Python to be installed on the operating system.
 */

@Injectable()
class YtdlpService {}

export { YtdlpService };
