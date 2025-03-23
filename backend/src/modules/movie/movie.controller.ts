import { Controller, Get, Query, StreamableFile } from '@nestjs/common';
import {
  MovieDownloadQueryDto,
  MovieQueryCustomClientsDto,
  MovieQueryDto,
  MovieDownloadStampDto,
  MovieDownloadMergeStreamsDto,
  MovieDownloadStampMergeStreamsDto,
} from './movie.dto';
import { MeasureExecutionTime } from './../../common/measure-decorator/measure-execution-time';
import {
  YtApiTag,
  YtFiltersSwagger,
  YtInfoSwagger,
  YtItagsSwagger,
  YtMergeLocalSwagger,
  YtMergeStreamSwagger,
  YTrimLocalSwagger,
  YtStreamSwagger,
  YtTrimStreamSwagger,
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
  @YtItagsSwagger
  @MeasureExecutionTime()
  getItags(@Query() query: MovieQueryCustomClientsDto) {
    return this.movieService.getItags({ ...query });
  }

  @Get('stream/all')
  @YtStreamSwagger
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
  @YTrimLocalSwagger
  @MeasureExecutionTime()
  async trimToFile(@Query() query: MovieDownloadStampDto): Promise<void> {
    await this.movieService.trimVideoToFile({ ...query });
  }

  @Get('stream/trim')
  @YtTrimStreamSwagger
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
  @YtMergeLocalSwagger
  @MeasureExecutionTime()
  async trimMergedToFile(
    @Query() query: MovieDownloadMergeStreamsDto,
  ): Promise<void> {
    await this.movieService.mergedFullVideoToFile({ ...query });
  }

  @Get('stream/trim/merge')
  @YtMergeStreamSwagger
  @MeasureExecutionTime()
  async getTrimMergedStream(
    @Query() query: MovieDownloadStampMergeStreamsDto,
  ): Promise<StreamableFile> {
    const trimmedStream = await this.movieService.mergedFullVideoToStream({
      ...query,
    });
    const headers = this.handleHeadersToStream(
      'video',
      trimmedStream.container,
    );
    return new StreamableFile(trimmedStream.stream, headers);
  }
}

export { MovieController };
