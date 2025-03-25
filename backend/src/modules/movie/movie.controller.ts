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
    const filter = await this.movieService.getCurrentFilter({ ...query });
    const stream = this.movieService.downloadFullVideo({
      ...query,
      filter,
    });
    const headers = this.handleHeadersToStream('video', filter.container);
    return new StreamableFile(stream, headers);
  }

  @Get('local-file/trim')
  @YTrimLocalSwagger
  @MeasureExecutionTime()
  async trimToFile(@Query() query: MovieDownloadStampDto): Promise<void> {
    const filter = await this.movieService.getCurrentFilter({ ...query });
    await this.movieService.trimVideoToFile({ ...query, filter });
  }

  @Get('stream/trim')
  @YtTrimStreamSwagger
  @MeasureExecutionTime()
  async getTrimmedStream(
    @Query() query: MovieDownloadStampDto,
  ): Promise<StreamableFile> {
    const filter = await this.movieService.getCurrentFilter({ ...query });
    const trimmedStream = this.movieService.downloadTrimmedVideo({
      ...query,
      filter,
    });
    const headers = this.handleHeadersToStream('video', filter.container);
    return new StreamableFile(trimmedStream, headers);
  }

  @Get('local-file/all/merge')
  @YtMergeLocalSwagger
  @MeasureExecutionTime()
  async trimMergedToFile(
    @Query() query: MovieDownloadMergeStreamsDto,
  ): Promise<void> {
    const bothFilters = await this.movieService.getBothFilters({ ...query });
    await this.movieService.mergedFullVideoToFile({ ...query, ...bothFilters });
  }

  @Get('stream/trim/merge')
  @YtMergeStreamSwagger
  @MeasureExecutionTime()
  async getTrimMergedStream(
    @Query() query: MovieDownloadStampMergeStreamsDto,
  ): Promise<StreamableFile> {
    const bothFilters = await this.movieService.getBothFilters({ ...query });
    const trimmedStream = await this.movieService.mergedFullVideoToStream({
      ...query,
      ...bothFilters,
    });

    const headers = this.handleHeadersToStream(
      'video',
      bothFilters.videoFilter.container,
    );
    return new StreamableFile(trimmedStream, headers);
  }
}

export { MovieController };
