import { Injectable } from '@nestjs/common';
import { FfmpegService } from './services/ffmpeg.service';
import { YtdlService } from './services/ytdl.service';
import { FsService } from './services/fs.service';
import { ClientEnum } from './movie.dto';
import { Readable } from 'stream';
import { videoFormat } from '@distube/ytdl-core';
import { YtDlpService } from './services/ytdlp.service';

type TInfo = { url: string; clients?: ClientEnum[] };
type TIsValidate = Pick<TInfo, 'url'>;
type TCurrentFormat = TInfo & { itag: number };
type TDownloadYtdpl = TInfo & {
  itag: string;
};
type TStream = { progressTrack?: boolean; filter: videoFormat; url: string };
type TStamp = {
  start: string;
  duration: number;
};
type TDownloadTrim = TStream & TStamp;
type TDownloadBoth = {
  url: string;
  audioFilter: videoFormat;
  videoFilter: videoFormat;
};
type TGetBothFilters = TInfo & {
  videoItag: number;
  audioItag: number;
};
type TGetBothFiltersResponse = {
  audioFilter: videoFormat;
  videoFilter: videoFormat;
};

type TBothStreamResponse = {
  videoFileHanlder: string;
  audioFileHandler: string;
};
type TIsValid = {
  isValid: boolean;
};
type TDownloadBothDuration = TDownloadBoth & TStamp;

@Injectable()
class MovieService {
  private readonly ffmpegService: FfmpegService;
  private readonly ytdlService: YtdlService;
  private readonly fsService: FsService;
  private readonly ytdlpService: YtDlpService;
  constructor(
    ffmpegServie: FfmpegService,
    ytdlService: YtdlService,
    fsService: FsService,
    ytdlpService: YtDlpService,
  ) {
    this.ffmpegService = ffmpegServie;
    this.ytdlService = ytdlService;
    this.fsService = fsService;
    this.ytdlpService = ytdlpService;
  }

  getVersion() {
    const version = this.ffmpegService
      .getVersion()
      .replace('Path:', '')
      .replace('Version:', '')
      .trim()
      .split(',');
    return { version: version[0], path: version[1] };
  }

  async getInfo({ url, clients }: TInfo) {
    return await this.ytdlService.getVideoInfo(url, clients);
  }

  isValidate({ url }: TIsValidate): TIsValid {
    return { isValid: this.ytdlService.validateURL(url) };
  }

  getFormats({ url, clients }: TInfo) {
    return this.ytdlService.getFormats(url, clients);
  }

  getItags({ url, clients }: TInfo) {
    return this.ytdlService.getItagsGroups(url, clients);
  }

  async getCurrentFilter({
    url,
    itag,
    clients,
  }: TCurrentFormat): Promise<videoFormat> {
    const ytSelectedFilter = await this.ytdlService.getFormatByItag(
      url,
      itag,
      clients,
    );
    return ytSelectedFilter;
  }

  downloadFullVideo({ url, filter, progressTrack }: TStream): Readable {
    const stream = this.ytdlService.createDownloadReadable(
      url,
      filter,
      progressTrack,
    );
    return stream;
  }

  downloadTrimmedVideo({
    url,
    filter,
    start,
    duration,
    progressTrack,
  }: TDownloadTrim): Readable {
    const fullStream = this.downloadFullVideo({
      url,
      filter,
      progressTrack,
    });
    const trimmedStream = this.ffmpegService.trimVideoToStream(
      fullStream,
      start,
      duration,
    );
    return trimmedStream;
  }
  async trimVideoToFile({
    url,
    filter,
    start,
    duration,
    progressTrack,
  }: TDownloadTrim): Promise<void> {
    const fullStream = this.downloadFullVideo({
      url,
      filter,
      progressTrack,
    });
    await this.ffmpegService.trimVideoToFile(fullStream, start, duration);
  }

  async getBothFilters({
    url,
    videoItag,
    audioItag,
    clients,
  }: TGetBothFilters): Promise<TGetBothFiltersResponse> {
    const [audioFilter, videoFilter] = await Promise.all([
      this.ytdlService.getFormatByItag(url, audioItag, clients),
      this.ytdlService.getFormatByItag(url, videoItag, clients),
    ]);
    console.log('Wrapped fetching fillters finished');
    return {
      audioFilter,
      videoFilter,
    };
  }

  private async getBothStreams(
    url: string,
    audioFilter: videoFormat,
    videoFilter: videoFormat,
  ): Promise<TBothStreamResponse> {
    const ytAudioStream = this.ytdlService.createDownloadReadable(
      url,
      audioFilter,
    );

    const ytVideoStream = this.ytdlService.createDownloadReadable(
      url,
      videoFilter,
    );

    console.log('Streams ready...');

    const [audioFile, videoFile] = await Promise.all([
      this.fsService.createFileFromStream(audioFilter.container, ytAudioStream),
      this.fsService.createFileFromStream(videoFilter.container, ytVideoStream),
    ]);
    return {
      audioFileHandler: audioFile,
      videoFileHanlder: videoFile,
    };
  }

  async mergedFullVideoToFile({
    url,
    audioFilter,
    videoFilter,
  }: TDownloadBoth): Promise<void> {
    console.log('Wrapped pipes to temp files');
    const { audioFileHandler, videoFileHanlder } = await this.getBothStreams(
      url,
      audioFilter,
      videoFilter,
    );
    try {
      await this.ffmpegService.mergeAudioVideoToFile(
        videoFileHanlder,
        audioFileHandler,
      );
      console.log('ffmpeg merge finished');
    } finally {
      await this.fsService.cleanUpFiles(audioFileHandler, videoFileHanlder);
      console.log('Cleaning up finished');
    }
  }

  async mergedFullVideoToStream({
    url,
    videoFilter,
    audioFilter,
    start,
    duration,
  }: TDownloadBothDuration): Promise<Readable> {
    const { audioFileHandler, videoFileHanlder } = await this.getBothStreams(
      url,
      audioFilter,
      videoFilter,
    );

    const stream = this.ffmpegService.mergedAudioVideoToStream(
      videoFileHanlder,
      audioFileHandler,
      start,
      duration,
    );

    stream.on('close', async () => {
      await this.fsService.cleanUpFiles(audioFileHandler, videoFileHanlder);
    });
    stream.on('error', async (err) => {
      await this.fsService.cleanUpFiles(audioFileHandler, videoFileHanlder);
      throw err;
    });
    return stream;
  }

  downloadFullVideoUsingYtDLP({
    url,
    itag,
    clients,
  }: TDownloadYtdpl): Readable {
    const stream = this.ytdlpService.getVideoByItag(url, itag, clients);

    return stream;
  }
}

export { MovieService };
