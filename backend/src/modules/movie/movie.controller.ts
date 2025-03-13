import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
  Res,
} from '@nestjs/common';
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
    try {
      return await this.ytdlService.getVideoInfo(query.url);
    } catch (err) {
      throw new HttpException('errorno', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('validate')
  isValidate(@Query() query: MovieQueryDto) {
    try {
      return this.ytdlService.validateURL(query.url);
    } catch (err) {
      throw new HttpException('errorno', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('filters')
  getFilters(@Query() query: MovieQueryDto) {
    try {
      return this.ytdlService.getFormats(query.url);
    } catch (err) {
      throw new HttpException('errorno', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('basic-download')
  async downloadMovie(@Query() query: MovieQueryDto) {
    try {
      await this.ytdlService.downloadBasic(query.url);

      return { success: true };
    } catch (err) {
      console.error(err);
      throw new HttpException('errorno', HttpStatus.BAD_REQUEST);
    }
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
