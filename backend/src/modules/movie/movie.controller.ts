import { Controller, Get, Query, Res } from '@nestjs/common';
import { YtdlService } from './services/ytdl.service';
import { MovieDownloadQueryDto, MovieQueryDto } from './movie.dto';
import { FastifyReply } from 'fastify';

@Controller('yt')
class MovieController {
  private readonly ytdlService: YtdlService;

  constructor(ytdlService: YtdlService) {
    this.ytdlService = ytdlService;
  }

  @Get('info')
  async getInfo(@Query() query: MovieQueryDto) {
    return await this.ytdlService.getVideoInfo(query.url);
  }

  @Get('validate')
  isValidate(@Query() query: MovieQueryDto) {
    return this.ytdlService.validateURL(query.url);
  }

  @Get('filters')
  getFilters(@Query() query: MovieQueryDto) {
    return this.ytdlService.getFormats(query.url);
  }

  @Get('basic-download')
  async downloadMovie(@Query() query: MovieQueryDto) {
    await this.ytdlService.downloadBasic(query.url);
    return { success: true };
  }

  @Get('download')
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

  @Get('download-file')
  async downloadMovieToFileByItag(@Query() query: MovieDownloadQueryDto) {
    await this.ytdlService.downloadFromItagToFile(query.url, query.itag);
    return { success: true };
  }
}

export { MovieController };
