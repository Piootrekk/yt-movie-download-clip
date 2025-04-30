import { Controller, Get, Query, StreamableFile } from '@nestjs/common';
import { MeasureExecutionTime } from '../../shared/measure-decorator/measure-execution-time';
import {
  MovieDownloadQueryDto,
  MovieQueryCustomClientsDto,
  MovieQueryDto,
  MovieDownloadStampDto,
  MovieDownloadMergeStreamsDto,
  MovieDownloadStampMergeStreamsDto,
  ValidationResponseDto,
  FfmpegInfoResposeDto,
  DownloadVideoYtDlpDto,
} from './movie.dto';
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
  async getVersion(): Promise<FfmpegInfoResposeDto> {
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
  async isValidate(
    @Query() query: MovieQueryDto,
  ): Promise<ValidationResponseDto> {
    return this.movieService.isValidate({ url: query.url });
  }

  @Get('formats')
  @YtFiltersSwagger
  @MeasureExecutionTime()
  async getFilters(@Query() query: MovieQueryCustomClientsDto) {
    return this.movieService.getFormats({ ...query });
  }

  @Get('itags')
  @YtItagsSwagger
  @MeasureExecutionTime()
  async getItags(@Query() query: MovieQueryCustomClientsDto) {
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

  @Get('v2/stream/all')
  @MeasureExecutionTime()
  async getStream(
    @Query() query: DownloadVideoYtDlpDto,
  ): Promise<StreamableFile> {
    const stream = this.movieService.downloadFullVideoUsingYtDLP({ ...query });
    const headers = this.handleHeadersToStream('video', 'mp4');
    return new StreamableFile(stream, headers);
  }

  @Get('v2/filters')
  @MeasureExecutionTime()
  async getFiltersV2(@Query() query: MovieQueryDto) {
    const filters = this.movieService.getfiltersYtDLP({ url: query.url });
    return filters;
  }

  @Get('v2/stream/trim/merge')
  @MeasureExecutionTime()
  async getTrimStreamV2(
    @Query() query: MovieDownloadStampMergeStreamsDto,
  ): Promise<StreamableFile> {
    const responseStream =
      await this.movieService.downloadMergedStreamUsingYtDLP({
        ...query,
      });
    const headers = this.handleHeadersToStream('video', 'mp4');
    return new StreamableFile(responseStream, headers);
  }
}

export { MovieController };
