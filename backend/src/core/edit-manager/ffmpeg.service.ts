import { Injectable } from '@nestjs/common';

/**
 * Service that utilizes the {@link https://www.ffmpeg.org/ | ffmpeg} solution.
 *
 * Provides wrapper methods that use system commands to fetch video information and download videos from YouTube.
 * 
 * Requires ffmpeg to be installed on the operating system.
 */
@Injectable()
class FfmpegService {}

export { FfmpegService };
