import { HttpException, Injectable } from '@nestjs/common';
import { YtdlpService } from 'src/core/download-manager/ytdlp.service';
import { TStreamByItagQuery } from './dto/stream-itag-body.dto';
import { TTrimmedBodyDto } from './dto/trimmed-stream.dto';
import { FfmpegService } from 'src/core/edit-manager/ffmpeg.service';
import { TMergedBodyDto } from './dto/merged-stream.dto';
import { TStreamFile } from 'src/core/file-manager/file.types';
import { FsService } from 'src/core/file-manager/fs.service';

@Injectable()
class StreamService {
  constructor(
    private ytdlpService: YtdlpService,
    private ffmpegService: FfmpegService,
    private fsService: FsService,
  ) {}

  getStream({ url, filters, clients }: TStreamByItagQuery) {
    return this.ytdlpService.createStreamById(url, filters.format_id, clients);
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
      filters.format_id,
      clients,
    );
    const trimmedStream = this.ffmpegService.trimVideoToStream(
      stream,
      start,
      duration,
      filters.ext,
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
    if (videoFilters.ext !== audioFilters.ext) {
      throw new HttpException(
        `Cannot merge audio type (${audioFilters.ext}) with video (${videoFilters.ext}). Use matching container formats.`,
        422,
      );
    }
    const videoStream = this.ytdlpService.createStreamById(
      url,
      videoFilters.format_id,
      clients,
    );
    const audioStream = this.ytdlpService.createStreamById(
      url,
      audioFilters.format_id,
      clients,
    );
    const fileStreams = [
      {
        fileName: 'videoTemp',
        extension: videoFilters.ext,
        stream: videoStream,
      },
      {
        fileName: 'audioTemp',
        extension: audioFilters.ext,
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
        videoFilters.ext || audioFilters.ext,
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
