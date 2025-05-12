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
    const promiseContainer = this.streamService.getContainer({ ...query });
    const promiseStream = this.streamService.getStreamById({ ...query });
    const [containerResolved, streamResolved] = await Promise.all([
      promiseContainer,
      promiseStream,
    ]);
    const header = handleStreamHeader('video', containerResolved);
    return new StreamableFile(streamResolved, header);
  }

  @Post('all')
  @StreamSwagger.streamAll
  async setStreamByFilters(
    @Body() body: AllByFiltersBodyDto,
  ): Promise<StreamableFile> {
    const header = handleStreamHeader('video', body.filters.container);
    const stream = this.streamService.streamVideo({ ...body });
    return new StreamableFile(stream, header);
  }

  @Post('trim')
  @StreamSwagger.streamTrimmed
  async setStreamTrimmed(
    @Body() body: TrimmedFiltersBodyDto,
  ): Promise<StreamableFile> {
    const header = handleStreamHeader('video', body.filters.container);
    const stream = this.streamService.trimVideo({ ...body });
    return new StreamableFile(stream, header);
  }

  @Post('merge')
  @StreamSwagger.streamMerged
  async setStreamMerged(
    @Body() body: MergeByFiltersBodyDto,
  ): Promise<StreamableFile> {
    const header = handleStreamHeader('video', body.videoFilters.container);
    const stream = await this.streamService.mergeVideo({ ...body });
    return new StreamableFile(stream, header);
  }
}

export { MovieStreamController };
