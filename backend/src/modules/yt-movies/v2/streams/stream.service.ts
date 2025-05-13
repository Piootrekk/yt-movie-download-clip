import { HttpException, Injectable } from '@nestjs/common';
import { YtdlpService } from 'src/core/download-manager/ytdlp.service';
import { FfmpegService } from 'src/core/edit-manager/ffmpeg.service';
import { TMergedBodyDto } from './dto/merged-stream.dto';
import { FsService } from 'src/core/file-manager/fs.service';
import type { TStreamFile } from 'src/core/file-manager/file.types';
import type { TStreamByItagQuery } from './dto/stream-itag-body.dto';
import type { TTrimmedBodyDto } from './dto/trimmed-stream.dto';

@Injectable()
class StreamService {
  constructor(
    private ytdlpService: YtdlpService,
    private ffmpegService: FfmpegService,
    private fsService: FsService,
  ) {}

  getStream({ url, filters, clients }: TStreamByItagQuery) {
    return this.ytdlpService.createStreamById(url, filters.itag, clients);
  }

  getTrimmedStream({
    url,
    filters,
    clients,
    start,
    duration,
  }: TTrimmedBodyDto) {
    const stream = this.ytdlpService.createStreamById(
      url,
      filters.itag,
      clients,
    );
    const trimmedStream = this.ffmpegService.trimVideoToStream(
      stream,
      start,
      duration,
      filters.container,
    );
    return trimmedStream;
  }

  async getMergedStream({
    url,
    clients,
    start,
    duration,
    videoFilters,
    audioFilters,
  }: TMergedBodyDto) {
    if (videoFilters.container !== audioFilters.container) {
      throw new HttpException(
        `Cannot merge audio type (${audioFilters.container}) with video (${videoFilters.container}). Use matching container formats.`,
        422,
      );
    }
    const videoStream = this.ytdlpService.createStreamById(
      url,
      videoFilters.itag,
      clients,
    );
    const audioStream = this.ytdlpService.createStreamById(
      url,
      audioFilters.itag,
      clients,
    );
    const fileStreams = [
      {
        fileName: 'videoTemp',
        extension: videoFilters.itag,
        stream: videoStream,
      },
      {
        fileName: 'audioTemp',
        extension: audioFilters.itag,
        stream: audioStream,
      },
    ] as const satisfies TStreamFile[];
    const fileHandlers =
      await this.fsService.createBulkFilesFromStreams(fileStreams);
    try {
      const mergedStream = this.ffmpegService.mergedAudioVideoToStream(
        fileHandlers.videoTemp,
        fileHandlers.audioTemp,
        start,
        duration,
        videoFilters.container || audioFilters.container,
      );
      return mergedStream;
    } finally {
      await this.fsService.cleanUpFiles(
        fileHandlers.audioTemp,
        fileHandlers.videoTemp,
      );
    }
  }
}

export { StreamService };
