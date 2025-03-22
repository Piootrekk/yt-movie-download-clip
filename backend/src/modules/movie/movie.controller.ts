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
    container?: string,
    type?: string,
  ): { type: string; disposition: string } {
    const sanitizedContaier = container || 'mp4';
    const sanitizedType = type || 'video';
    const sanitizedName =
      fileName || `${sanitizedType}-${Date.now()}.${sanitizedContaier}`;
    return {
      type: `${sanitizedType}/${sanitizedContaier}`,
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

  @Get('stream/all')
  @YtDownloadSwagger
  @MeasureExecutionTime()
  async getAllStream(
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
  async trimToFile(@Query() query: MovieDownloadStampDto): Promise<void> {
    await this.movieService.trimVideoToFile({ ...query });
  }

  @Get('stream/trim')
  @MeasureExecutionTime()
  async getTrimmedStream(
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

  @Get('local-file/all/merge')
  @MeasureExecutionTime()
  async trimMergedToFile(
    @Query() query: MovieDownloadBothStreamDto,
  ): Promise<void> {
    await this.movieService.mergedFullVideoToFile({ ...query });
  }

  @Get('stream/trim/merge')
  @MeasureExecutionTime()
  async getTrimMergedStream(
    @Query() query: MovieDownloadBothStreamDto,
  ): Promise<StreamableFile> {
    
  }
}

export { MovieController };
