import { videoFormat } from '@distube/ytdl-core';
import { Injectable } from '@nestjs/common';
import { ClientEnum } from 'src/core/download-manager/declare-types/ytdl-core.enum';
import { YtdlCoreService } from 'src/core/download-manager/ytdl-core.service';
import { FfmpegService } from 'src/core/edit-manager/ffmpeg.service';
import { TStreamFile } from 'src/core/file-manager/file.types';
import { FsService } from 'src/core/file-manager/fs.service';
import { Readable } from 'stream';

@Injectable()
class StreamService {
  constructor(
    private ytdlCoreService: YtdlCoreService,
    private ffmpegService: FfmpegService,
    private fsService: FsService,
  ) {}

  async getContainer(url: string, itag: number, clients?: ClientEnum[]) {
    const format = await this.ytdlCoreService.getFormatByItag(
      url,
      itag,
      clients,
    );
    return format.container;
  }

  async getStreamById(
    url: string,
    itag: number,
    clients?: ClientEnum[],
    sizeChunk?: number,
  ): Promise<Readable> {
    const format = await this.ytdlCoreService.getFormatByItag(
      url,
      itag,
      clients,
    );
    const stream = this.ytdlCoreService.createStream(url, format, sizeChunk);
    return stream;
  }
  streamVideo(url: string, format: videoFormat, sizeChunk?: number): Readable {
    return this.ytdlCoreService.createStream(url, format, sizeChunk);
  }

  trimVideo(
    url: string,
    format: videoFormat,
    start: string,
    duration: number,
    sizeChunk?: number,
  ): Readable {
    const stream = this.ytdlCoreService.createStream(url, format, sizeChunk);
    const trimmedStream = this.ffmpegService.trimVideoToStream(
      stream,
      start,
      duration,
      format.container,
    );
    return trimmedStream;
  }

  async mergeVideo(
    url: string,
    videoFormat: videoFormat,
    audioFormat: videoFormat,
    start: string,
    duration: number,
    sizeChunk?: number,
  ) {
    const videoStream = this.ytdlCoreService.createStream(
      url,
      videoFormat,
      sizeChunk,
    );
    const audioStream = this.ytdlCoreService.createStream(
      url,
      audioFormat,
      sizeChunk,
    );

    const fileStreams = [
      {
        fileName: 'videoTemp',
        extension: videoFormat.container,
        stream: videoStream,
      },
      {
        fileName: 'audioTemp',
        extension: audioFormat.container,
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
        videoFormat.container,
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
