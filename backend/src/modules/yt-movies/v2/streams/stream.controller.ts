import {
  Body,
  Controller,
  Get,
  Post,
  StreamableFile,
  UseFilters,
} from '@nestjs/common';
import { StreamService } from './stream.service';
import { StreamByItagBodyDto } from './dto/stream-itag-body.dto';
import { handleStreamHeader } from 'src/shared/header-stream';
import { TrimmedBodyDto } from './dto/trimmed-stream.dto';
import { MergedBodyDto } from './dto/merged-stream.dto';
import { HttpExceptionFilter } from 'src/shared/errors/http-exception.filter';
import { StreamSwagger } from './stream.swagger';

@Controller('v2/yt-movie')
@UseFilters(HttpExceptionFilter)
@StreamSwagger.YtApiTag
class MovieStreamController {
  constructor(private streamService: StreamService) {}

  @Post('all')
  @StreamSwagger.streamAll
  async setStreamByFilters(
    @Body() body: StreamByItagBodyDto,
  ): Promise<StreamableFile> {
    const header = handleStreamHeader({
      fileName: 'video',
      container: body.filters.container,
    });
    const stream = this.streamService.getStream({ ...body });
    return new StreamableFile(stream, header);
  }

  @Post('trim')
  @StreamSwagger.streamTrimmed
  async setStreamTrimmed(
    @Body() body: TrimmedBodyDto,
  ): Promise<StreamableFile> {
    const header = handleStreamHeader({
      fileName: 'video',
      container: body.filters.container,
    });
    const stream = this.streamService.getTrimmedStream({ ...body });
    return new StreamableFile(stream, header);
  }

  @Post('merge')
  @StreamSwagger.streamMerged
  async setStreamMerged(@Body() body: MergedBodyDto): Promise<StreamableFile> {
    const header = handleStreamHeader({
      fileName: 'video',
      container: body.videoFilters.container,
    });
    const stream = await this.streamService.getMergedStream({ ...body });
    return new StreamableFile(stream, header);
  }
}

export { MovieStreamController };
