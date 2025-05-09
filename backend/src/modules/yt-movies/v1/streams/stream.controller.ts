import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  StreamableFile,
  UseFilters,
} from '@nestjs/common';
import { StreamService } from './stream.service';
import { StreamByItagQueryDto } from './dto/all-itag-query.dto';
import { AllByFiltersBodyDto } from './dto/all-filters-body.dto';
import { MergeByFiltersBodyDto } from './dto/merge-filters-body.dto';
import { TrimmedFiltersBodyDto } from './dto/trimmed-filters-body.dto';
import { StreamSwagger } from './stream.swagger';
import { handleStreamHeader } from 'src/shared/header-stream';
import { HttpExceptionFilter } from 'src/shared/errors/http-exception.filter';

@Controller('yt-movie/v1/stream')
@UseFilters(HttpExceptionFilter)
@StreamSwagger.YtApiTag
class MovieStreamController {
  constructor(private streamService: StreamService) {}

  @Get('all')
  @StreamSwagger.streamAll
  async getStreamById(
    @Query() query: StreamByItagQueryDto,
  ): Promise<StreamableFile> {
    const container = await this.streamService.getContainer(
      query.url,
      query.itag,
      query.clients,
    );
    const header = handleStreamHeader('video', container);
    const stream = await this.streamService.getStreamById(
      query.url,
      query.itag,
      query.clients,
      query.chunkSize,
    );
    return new StreamableFile(stream, header);
  }

  @Post('all')
  @StreamSwagger.streamAll
  async setStreamByFilters(@Body() body: AllByFiltersBodyDto) {
    const header = handleStreamHeader('video', body.filters.container);
    const stream = this.streamService.streamVideo(
      body.url,
      body.filters,
      body.chunkSize,
    );
    return new StreamableFile(stream, header);
  }

  @Post('trim')
  @StreamSwagger.streamTrimmed
  async setStreamTrimmed(@Body() body: TrimmedFiltersBodyDto) {
    const header = handleStreamHeader('video', body.filters.container);
    const stream = this.streamService.trimVideo(
      body.url,
      body.filters,
      body.start,
      body.duration,
      body.chunkSize,
    );
    return new StreamableFile(stream, header);
  }

  @Post('merge')
  @StreamSwagger.streamMerged
  async setStreamMerged(@Body() body: MergeByFiltersBodyDto) {
    const header = handleStreamHeader('video', body.videoFilters.container);
    const stream = await this.streamService.mergeVideo(
      body.url,
      body.videoFilters,
      body.audioFilters,
      body.start,
      body.duration,
      body.chunkSize,
    );
    return new StreamableFile(stream, header);
  }
}

export { MovieStreamController };
