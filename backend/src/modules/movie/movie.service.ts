import { Injectable } from '@nestjs/common';
import { FfmpegService } from './services/ffmpeg.service';
import { YtdlService } from './services/ytdl.service';
import { FsService } from './services/fs.service';
import { ClientEnum } from './movie.dto';
import Stream from 'stream';

type TInfo = { url: string; clients?: ClientEnum[] };
type TIsValidate = Pick<TInfo, 'url'>;
type TDownload = TInfo & { progressTrack?: boolean; itag: number };
type TDownloadResponse = {
  stream: Stream.Readable;
  container: string;
};
type TDownloadTrim = TDownload & {
  start: string;
  duration: number;
};

type TDownloadBoth = TInfo & {
  videoItag: number;
  audioItag: number;
  progressTrack?: boolean;
};

@Injectable()
class MovieService {
  private readonly ffmpegService: FfmpegService;
  private readonly ytdlService: YtdlService;
  private readonly fsService: FsService;
  constructor(
    ffmpegServie: FfmpegService,
    ytdlService: YtdlService,
    fsService: FsService,
  ) {
    this.ffmpegService = ffmpegServie;
    this.ytdlService = ytdlService;
    this.fsService = fsService;
  }

  getVersion() {
    return this.ffmpegService.getVersion();
  }

  async getInfo({ url, clients }: TInfo) {
    return await this.ytdlService.getVideoInfo(url, clients);
  }

  isValidate({ url }: TIsValidate): boolean {
    return this.ytdlService.validateURL(url);
  }

  getFormats({ url, clients }: TInfo) {
    return this.ytdlService.getFormats(url, clients);
  }

  getItags({ url, clients }: TInfo) {
    return this.ytdlService.getItagsGroups(url, clients);
  }

  async downloadFullVideo({
    url,
    itag,
    clients,
    progressTrack,
  }: TDownload): Promise<TDownloadResponse> {
    const ytSelectedFilter = await this.ytdlService.getFormatByItag(
      url,
      itag,
      clients,
    );
    const stream = this.ytdlService.createDownloadReadable(
      url,
      ytSelectedFilter,
      progressTrack,
    );
    return { stream: stream, container: ytSelectedFilter.container };
  }

  async downloadTrimmedVideo({
    url,
    itag,
    start,
    duration,
    clients,
    progressTrack,
  }: TDownloadTrim): Promise<TDownloadResponse> {
    const fullStream = await this.downloadFullVideo({
      url,
      itag,
      clients,
      progressTrack,
    });
    const trimmedStream = this.ffmpegService.trimVideoToStream(
      fullStream.stream,
      start,
      duration,
    );
    return {
      stream: trimmedStream,
      container: fullStream.container,
    };
  }
  async trimVideoToFile({
    url,
    itag,
    start,
    duration,
    clients,
    progressTrack,
  }: TDownloadTrim): Promise<void> {
    const fullStream = await this.downloadFullVideo({
      url,
      itag,
      clients,
      progressTrack,
    });
    await this.ffmpegService.trimVideoToFile(
      fullStream.stream,
      start,
      duration,
    );
  }

  async margedFullVideoToFile({
    url,
    clients,
    audioItag,
    videoItag,
  }: TDownloadBoth): Promise<void> {
    const audioFilters = await this.ytdlService.getFormatByItag(
      url,
      audioItag,
      clients,
    );
    console.log('fetched audio filters');
    const videoFilters = await this.ytdlService.getFormatByItag(
      url,
      videoItag,
      clients,
    );
    console.log('fetched video filters');
    const ytAudioStream = this.ytdlService.createDownloadReadable(
      url,
      audioFilters,
    );
    console.log('fetched audio stream');

    const ytVideoStream = this.ytdlService.createDownloadReadable(
      url,
      videoFilters,
    );
    console.log('fetched video stream');
    const audioFile = await this.fsService.createFileFromStream(
      audioFilters.container,
      ytAudioStream,
    );
    console.log('audio file finished');
    const videoFile = await this.fsService.createFileFromStream(
      videoFilters.container,
      ytVideoStream,
    );
    console.log('video file finished');
    await this.ffmpegService.margeAudioVideoToFile(videoFile, audioFile);
    await this.fsService.cleanUpFiles(audioFile, videoFile);
  }
}

export { MovieService };
