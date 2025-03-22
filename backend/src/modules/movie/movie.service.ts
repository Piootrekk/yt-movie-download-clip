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

type TStamp = {
  start: string;
  duration: number;
};

type TDownloadTrim = TDownload & TStamp;

type TDownloadBoth = TInfo & {
  videoItag: number;
  audioItag: number;
  progressTrack?: boolean;
};

type TBothStreamResponse = {
  videoFileHanlder: string;
  audioFileHandler: string;
  audioContainer: string;
  videoContainer: string;
};

type TDownloadBothDuration = TDownloadBoth & TStamp;

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

  private async getBothStreams(
    url: string,
    audioItag: number,
    videoItag: number,
    clients?: ClientEnum[],
  ): Promise<TBothStreamResponse> {
    const [audioFilters, videoFilters] = await Promise.all([
      this.ytdlService.getFormatByItag(url, audioItag, clients),
      this.ytdlService.getFormatByItag(url, videoItag, clients),
    ]);

    console.log('Wrapped fetching fillters finished');

    const ytAudioStream = this.ytdlService.createDownloadReadable(
      url,
      audioFilters,
    );

    const ytVideoStream = this.ytdlService.createDownloadReadable(
      url,
      videoFilters,
    );

    console.log('Streams ready...');

    const [audioFile, videoFile] = await Promise.all([
      this.fsService.createFileFromStream(
        audioFilters.container,
        ytAudioStream,
      ),
      this.fsService.createFileFromStream(
        videoFilters.container,
        ytVideoStream,
      ),
    ]);
    return {
      audioFileHandler: audioFile,
      audioContainer: audioFilters.container,
      videoFileHanlder: videoFile,
      videoContainer: videoFilters.container,
    };
  }

  async mergedFullVideoToFile({
    url,
    clients,
    audioItag,
    videoItag,
  }: TDownloadBoth): Promise<void> {
    console.log('Wrapped pipes to temp files');
    const { audioFileHandler, videoFileHanlder } = await this.getBothStreams(
      url,
      audioItag,
      videoItag,
      clients,
    );
    await this.ffmpegService.mergeAudioVideoToFile(
      videoFileHanlder,
      audioFileHandler,
    );
    console.log('ffmpeg merge finished');

    await this.fsService.cleanUpFiles(audioFileHandler, videoFileHanlder);
    console.log('Cleaning up finished');
  }

  async mergedFullVideoToStream({
    url,
    clients,
    audioItag,
    videoItag,
    start,
    duration,
  }: TDownloadBothDuration): Promise<TDownloadResponse> {
    const {
      audioFileHandler,
      videoFileHanlder,
      videoContainer,
      audioContainer,
    } = await this.getBothStreams(url, audioItag, videoItag, clients);
    const stream = this.ffmpegService.mergedAudioVideoToStream(
      videoFileHanlder,
      audioFileHandler,
      start,
      duration,
    );
    return {
      stream: stream,
      container: videoContainer || audioContainer,
    };
  }
}

export { MovieService };
