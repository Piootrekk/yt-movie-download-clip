import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  StreamableFile,
} from '@nestjs/common';
import { StreamService } from './stream.service';
import { StreamByItagQueryDto } from './dto/all-itag-query.dto';
import { AllByFiltersBodyDto } from './dto/all-filters-body.dto';
import { MergeByFiltersBodyDto } from './dto/merge-filters-body.dto';
import { TrimmedFiltersBodyDto } from './dto/trimmed-filters-body.dto';
import { StreamSwagger } from './stream.swagger';
import { handleStreamHeader } from 'src/shared/header-stream';

@Controller('yt-movie/v1/stream')
@StreamSwagger.YtApiTag
class MovieStreamController {
  constructor(private streamService: StreamService) {}

  @Get('all')
  @StreamSwagger.streamAllSwagger
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
  @StreamSwagger.streamAllSwagger
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
  @StreamSwagger.streamTrimmedSwagger
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
  @StreamSwagger.streamMergedSwagger
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
