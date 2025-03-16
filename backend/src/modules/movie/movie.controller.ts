import { Controller, Get, Query, Res, StreamableFile } from '@nestjs/common';
import { YtdlService } from './services/ytdl.service';
import {
  MovieDownloadQueryDto,
  MovieDownloadStampDto,
  MovieQueryCustomClientsDto,
  MovieQueryDto,
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

@YtApiTag
@Controller('yt')
class MovieController {
  private readonly ytdlService: YtdlService;

  constructor(ytdlService: YtdlService) {
    this.ytdlService = ytdlService;
  }

  @Get('info')
  @YtInfoSwagger
  @MeasureExecutionTime()
  async getInfoCustomClients(@Query() query: MovieQueryCustomClientsDto) {
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
  getFiltersCustomClients(@Query() query: MovieQueryCustomClientsDto) {
    return this.ytdlService.getFormats(query.url, query.clients);
  }

  @Get('download/all')
  @YtDownloadSwagger
  @MeasureExecutionTime()
  async downlaodVideo(
    @Query() query: MovieDownloadQueryDto,
    @Res({ passthrough: true }) response: FastifyReply,
  ): Promise<StreamableFile> {
    const fileName = `video-${Date.now()}.mp4`;

    response.raw.setHeader(
      'Content-Disposition',
      `attachment; filename="${fileName}"`,
    );
    response.raw.setHeader('Content-Type', 'video/mp4');
    const stream = await this.ytdlService.createDownloadReadable(
      query.url,
      query.itag,
      query.clients,
    );
    return new StreamableFile(stream);
  }

  @Get('download/stamp')
  @YtDownloadSwagger
  @MeasureExecutionTime()
  async downloadVideoStamp(
    @Query() query: MovieDownloadStampDto,
    @Res({ passthrough: true }) response: FastifyReply,
  ): Promise<StreamableFile> {
    const fileName = `video-${Date.now()}.mp4`;
    response.raw.setHeader(
      'Content-Disposition',
      `attachment; filename="${fileName}"`,
    );
    const stream = await this.ytdlService.createDownloadStampReadable(
      query.url,
      query.itag,
      query.begin,
      query.clients,
    );
    return new StreamableFile(stream);
  }
}

export { MovieController };
