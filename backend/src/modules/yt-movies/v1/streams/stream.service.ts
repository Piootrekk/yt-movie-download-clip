import { HttpException, Injectable } from '@nestjs/common';
import { YtdlCoreService } from 'src/core/download-manager/ytdl-core.service';
import { FfmpegService } from 'src/core/edit-manager/ffmpeg.service';
import { FsService } from 'src/core/file-manager/fs.service';
import { Readable } from 'stream';
import type { TStreamFile } from 'src/core/file-manager/file.types';
import type { TStreamByItagQueryDto } from './dto/all-itag-query.dto';
import type { TAllByFiltersBodyDto } from './dto/all-filters-body.dto';
import type { TTrimmedFiltersBodyDto } from './dto/trimmed-filters-body.dto';
import type { TMergeByFiltersBodyDto } from './dto/merge-filters-body.dto';

@Injectable()
class StreamService {
  constructor(
    private ytdlCoreService: YtdlCoreService,
    private ffmpegService: FfmpegService,
    private fsService: FsService,
  ) {}

  async getContainer({ url, itag, clients }: TStreamByItagQueryDto) {
    const format = await this.ytdlCoreService.getFormatByItag(
      url,
      itag,
      clients,
    );
    return format.container;
  }

  async getStreamById({
    url,
    itag,
    clients,
    chunkSize,
  }: TStreamByItagQueryDto): Promise<Readable> {
    const format = await this.ytdlCoreService.getFormatByItag(
      url,
      itag,
      clients,
    );
    const stream = this.ytdlCoreService.createStream(url, format, chunkSize);
    return stream;
  }

  streamVideo({ url, chunkSize, filters }: TAllByFiltersBodyDto): Readable {
    return this.ytdlCoreService.createStream(url, filters, chunkSize);
  }

  trimVideo({
    url,
    filters,
    chunkSize,
    start,
    duration,
  }: TTrimmedFiltersBodyDto): Readable {
    const stream = this.ytdlCoreService.createStream(url, filters, chunkSize);
    const trimmedStream = this.ffmpegService.trimVideoToStream(
      stream,
      start,
      duration,
      filters.container,
    );
    return trimmedStream;
  }

  async mergeVideo({
    url,
    audioFilters,
    videoFilters,
    chunkSize,
    start,
    duration,
  }: TMergeByFiltersBodyDto) {
    if (audioFilters.container !== videoFilters.container) {
      throw new HttpException(
        `Cannot merge audio type (${audioFilters.container}) with video (${videoFilters.container}). Use matching container formats.`,
        422,
      );
    }
    const videoStream = this.ytdlCoreService.createStream(
      url,
      videoFilters,
      chunkSize,
    );
    const audioStream = this.ytdlCoreService.createStream(
      url,
      audioFilters,
      chunkSize,
    );

    const fileStreams = [
      {
        fileName: 'videoTemp',
        extension: videoFilters.container,
        stream: videoStream,
      },
      {
        fileName: 'audioTemp',
        extension: audioFilters.container,
        stream: audioStream,
      },
    ] as const satisfies TStreamFile[];

    const fileHandlers =
      await this.fsService.createBulkFilesFromStreams(fileStreams);

    const mergedStream = this.ffmpegService.mergedAudioVideoToStream(
      fileHandlers.videoTemp,
      fileHandlers.audioTemp,
      start,
      duration,
      videoFilters.container,
    );
    mergedStream.on('close', () => {
      this.fsService
        .cleanUpFiles(fileHandlers.audioTemp, fileHandlers.videoTemp)
        .catch(() => {
          throw new HttpException('Error during files cleanup', 500);
        });
    });
    return mergedStream;
  }
}

export { StreamService };
