import { Controller, Get, Query, Res } from '@nestjs/common';
import { YtdlService } from './services/ytdl.service';
import {
  MovieDownloadQueryCustomClientDto,
  MovieDownloadQueryDto,
  MovieQueryCustomClientsDto,
  MovieQueryDto,
} from './movie.dto';
import { FastifyReply } from 'fastify';
import { MeasureExecutionTime } from './../../common/measure-decorator/measure-execution-time';
import {
  YtApiTag,
  YtDownloadSwagger,
  YtFiltersSwagger,
  YtInfoCustomClientsSwagger,
  YtInfoSwagger,
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
  async getInfo(@Query() query: MovieQueryDto) {
    const response = await this.ytdlService.getVideoInfo(query.url);
    return response;
  }

  @Get('info/custom-client')
  @YtInfoCustomClientsSwagger
  @MeasureExecutionTime()
  async getInfoCustomClients(@Query() query: MovieQueryCustomClientsDto) {
    return await this.ytdlService.getVideoInfo(query.url, query.clients);
  }

  @Get('validate')
  isValidate(@Query() query: MovieQueryDto) {
    return this.ytdlService.validateURL(query.url);
  }

  @Get('filters')
  @YtFiltersSwagger
  @MeasureExecutionTime()
  getFilters(@Query() query: MovieQueryDto) {
    return this.ytdlService.getFormats(query.url);
  }

  @Get('filters/custom-client')
  @YtFiltersSwagger
  @MeasureExecutionTime()
  getFiltersCustomClients(@Query() query: MovieQueryCustomClientsDto) {
    return this.ytdlService.getFormats(query.url, query.clients);
  }

  @Get('download')
  @YtDownloadSwagger
  @MeasureExecutionTime()
  async downloadMovieByItag(
    @Query() query: MovieDownloadQueryDto,
    @Res() reply: FastifyReply,
  ) {
    const fileName = 'video.mp4';

    reply.raw.setHeader(
      'Content-Disposition',
      `attachment; filename="${fileName}"`,
    );
    reply.raw.setHeader('Content-Type', 'video/mp4');
    await this.ytdlService.downloadFromItag(query.url, query.itag, reply);
  }

  @Get('download/custom-client')
  @YtDownloadSwagger
  @MeasureExecutionTime()
  async downloadMovieByItagCustomClient(
    @Query() query: MovieDownloadQueryCustomClientDto,
    @Res() reply: FastifyReply,
  ) {
    const fileName = 'video.mp4';

    reply.raw.setHeader(
      'Content-Disposition',
      `attachment; filename="${fileName}"`,
    );
    reply.raw.setHeader('Content-Type', 'video/mp4');
    await this.ytdlService.downloadFromItag(
      query.url,
      query.itag,
      reply,
      query.clients,
    );
  }

  @Get('download-file')
  async downloadMovieToFileByItag(@Query() query: MovieDownloadQueryDto) {
    await this.ytdlService.downloadFromItagToFile(query.url, query.itag);
    return { success: true };
  }
}

export { MovieController };
