import { Controller, Get, Query, StreamableFile } from '@nestjs/common';
import {
  MovieDownloadQueryDto,
  MovieQueryCustomClientsDto,
  MovieQueryDto,
  MovieDownloadStampDto,
  MovieDownloadBothStreamDto,
} from './movie.dto';
import { MeasureExecutionTime } from './../../common/measure-decorator/measure-execution-time';
import {
  YtApiTag,
  YtDownloadSwagger,
  YtFiltersSwagger,
  YtInfoSwagger,
  YtValidateUrlSwagger,
} from './movie.swagger';
import { MovieService } from './movie.service';

@YtApiTag
@Controller('yt')
class MovieController {
  private readonly movieService: MovieService;

  constructor(movieService: MovieService) {
    this.movieService = movieService;
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

  @Get('ffmpeginfo')
  getVersion() {
    return this.movieService.getVersion();
  }

  @Get('info')
  @YtInfoSwagger
  @MeasureExecutionTime()
  async getInfo(@Query() query: MovieQueryCustomClientsDto) {
    return await this.movieService.getInfo({ ...query });
  }

  @Get('validate')
  @YtValidateUrlSwagger
  isValidate(@Query() query: MovieQueryDto): boolean {
    return this.movieService.isValidate({ url: query.url });
  }

  @Get('formats')
  @YtFiltersSwagger
  @MeasureExecutionTime()
  getFilters(@Query() query: MovieQueryCustomClientsDto) {
    return this.movieService.getFormats({ ...query });
  }

  @Get('itags')
  @MeasureExecutionTime()
  getItags(@Query() query: MovieQueryCustomClientsDto) {
    return this.movieService.getItags({ ...query });
  }

  @Get('download/all')
  @YtDownloadSwagger
  @MeasureExecutionTime()
  async downloadVideo(
    @Query() query: MovieDownloadQueryDto,
  ): Promise<StreamableFile> {
    const download = await this.movieService.downloadFullVideo({
      ...query,
      progressTrack: true,
    });
    const headers = this.handleHeadersToStream('video', download.container);
    return new StreamableFile(download.stream, headers);
  }

  @Get('local-file/trim')
  @MeasureExecutionTime()
  async trimLocalFile(@Query() query: MovieDownloadStampDto): Promise<void> {
    await this.trimLocalFile({ ...query });
  }

  @Get('download/trim')
  @MeasureExecutionTime()
  async downloadVideoTrim(
    @Query() query: MovieDownloadStampDto,
  ): Promise<StreamableFile> {
    const trimmedDownload = await this.movieService.downloadTrimmedVideo({
      ...query,
    });
    const headers = this.handleHeadersToStream(
      'video',
      trimmedDownload.container,
    );
    return new StreamableFile(trimmedDownload.stream, headers);
  }

  @Get('download-both/local-file')
  @MeasureExecutionTime()
  async downloadAudioAndVidoe(
    @Query() query: MovieDownloadBothStreamDto,
  ): Promise<void> {}
}

export { MovieController };
