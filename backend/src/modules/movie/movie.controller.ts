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
  async downlaodVideo(
    @Query() query: MovieDownloadQueryDto,
    @Res({ passthrough: true }) reply: FastifyReply,
  ): Promise<StreamableFile> {
    const fileName = `video-${Date.now()}.mp4`;
    reply.raw.setHeader(
      'Content-Disposition',
      `attachment; filename="${fileName}"`,
    );
    reply.raw.setHeader('Content-Type', 'video/mp4');

    const stream = await this.ytdlService.createDownloadReadable(
      query.url,
      query.itag,
      query.clients,
    );
    return new StreamableFile(stream);
  }

  @Get('download/begin')
  @YtDownloadSwagger
  @MeasureExecutionTime()
  async downloadVideoStamp(
    @Query() query: MovieDownloadBeginDto,
    @Res({ passthrough: true }) reply: FastifyReply,
  ): Promise<StreamableFile> {
    const fileName = `video-${Date.now()}.mp4`;
    reply.raw.setHeader(
      'Content-Disposition',
      `attachment; filename="${fileName}"`,
    );
    reply.raw.setHeader('Content-Type', 'video/mp4');

    const stream = await this.ytdlService.createDownloadStampReadable(
      query.url,
      query.itag,
      query.begin,
      query.clients,
    );
    return new StreamableFile(stream);
  }

  @Get('local-file/trim')
  @MeasureExecutionTime()
  async trimLocalFile(@Query() query: MovieDownloadStampDto) {
    const stream = await this.ytdlService.createDownloadReadable(
      query.url,
      query.itag,
      query.clients,
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
    @Res() reply: FastifyReply,
  ) {
    const fileName = `video-${Date.now()}.mp4`;
    reply.raw.setHeader(
      'Content-Disposition',
      `attachment; filename="${fileName}"`,
    );
    reply.raw.setHeader('Content-Type', 'video/mp4');

    const stream = await this.ytdlService.createDownloadReadable(
      query.url,
      query.itag,
      query.clients,
    );
    return await this.ffmpegService.trimVideoToStream(
      stream,
      query.start,
      query.duration,
    );
  }
}

export { MovieController };
