import { Controller, Get, Query, Res, StreamableFile } from '@nestjs/common';
import { YtdlService } from './services/ytdl.service';
import {
  MovieDownloadQueryDto,
  MovieDownloadBeginDto,
  MovieQueryCustomClientsDto,
  MovieQueryDto,
  MovieDownloadStampDto,
} from './movie.dto';
import { FastifyReply } from 'fastify';
import { MeasureExecutionTime } from './../../common/measure-decorator/measure-execution-time';
import {
  YtApiTag,
  YtDownloadSwagger,
  YtFiltersSwagger,
  YtInfoSwagger,
  YtValidateUrlSwagger,
} from './movie.swagger';
import { FfmpegService } from './services/ffmpeg.service';

@YtApiTag
@Controller('yt')
class MovieController {
  private readonly ytdlService: YtdlService;
  private readonly ffmpegService: FfmpegService;

  constructor(ytdlService: YtdlService, ffmpegService: FfmpegService) {
    this.ytdlService = ytdlService;
    this.ffmpegService = ffmpegService;
  }

  private handleHeadersToStream(
    fileName?: string,
    fileType?: string,
  ): { type: string; disposition: string } {
    const sanitizedType = fileType || 'mp4';
    const sanitizedName = fileName || `video-${Date.now()}.${sanitizedType}`;
    return {
      type: `video/${sanitizedType}`,
      disposition: `attachment; filename="${sanitizedName}"`,
    };
  }

  @Get('info')
  @YtInfoSwagger
  @MeasureExecutionTime()
  async getInfo(@Query() query: MovieQueryCustomClientsDto) {
    this.ffmpegService.getVersion();
    return await this.ytdlService.getVideoInfo(query.url, query.clients);
  }

  @Get('validate')
  @YtValidateUrlSwagger
  isValidate(@Query() query: MovieQueryDto): boolean {
    return this.ytdlService.validateURL(query.url);
  }

  @Get('filters')
  @YtFiltersSwagger
  @MeasureExecutionTime()
  getFilters(@Query() query: MovieQueryCustomClientsDto) {
    return this.ytdlService.getFormats(query.url, query.clients);
  }

  @Get('download/all')
  @YtDownloadSwagger
  @MeasureExecutionTime()
  async downloadVideo(
    @Query() query: MovieDownloadQueryDto,
  ): Promise<StreamableFile> {
    const ytSelectedFilter = await this.ytdlService.getFormatByItag(
      query.url,
      query.itag,
      query.clients,
    );
    const headers = this.handleHeadersToStream(
      'video',
      ytSelectedFilter.container,
    );
    const stream = this.ytdlService.createDownloadReadable(
      query.url,
      ytSelectedFilter,
      true,
    );
    return new StreamableFile(stream, headers);
  }

  @Get('local-file/trim')
  @MeasureExecutionTime()
  async trimLocalFile(@Query() query: MovieDownloadStampDto): Promise<void> {
    const ytSelectedFilter = await this.ytdlService.getFormatByItag(
      query.url,
      query.itag,
      query.clients,
    );
    const stream = this.ytdlService.createDownloadReadable(
      query.url,
      ytSelectedFilter,
    );

    await this.ffmpegService.trimVideoToFile(
      stream,
      query.start,
      query.duration,
    );
  }

  @Get('download/trim')
  @MeasureExecutionTime()
  async downloadVideoTrim(
    @Query() query: MovieDownloadStampDto,
  ): Promise<StreamableFile> {
    const ytSelectedFilter = await this.ytdlService.getFormatByItag(
      query.url,
      query.itag,
      query.clients,
    );
    const headers = this.handleHeadersToStream(
      'video',
      ytSelectedFilter.container,
    );
    const ytStream = this.ytdlService.createDownloadReadable(
      query.url,
      ytSelectedFilter,
    );
    const trimmedStream = this.ffmpegService.trimVideoToStream(
      ytStream,
      query.start,
      query.duration,
    );
    return new StreamableFile(trimmedStream, headers);
  }
}

export { MovieController };
