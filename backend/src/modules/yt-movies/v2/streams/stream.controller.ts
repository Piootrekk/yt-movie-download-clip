import { Body, Controller, Get, StreamableFile } from '@nestjs/common';
import { StreamService } from './stream.service';
import { StreamByItagBodyDto } from './dto/stream-itag-body.dto';
import { handleStreamHeader } from 'src/shared/header-stream';
import { TrimmedBodyDto } from './dto/trimmed-stream.dto';
import { MergedBodyDto } from './dto/merged-stream.dto';

@Controller('v2/yt-movie')
class MovieStreamController {
  constructor(private streamService: StreamService) {}
  @Get('all')
  async setStreamByFilters(
    @Body() body: StreamByItagBodyDto,
  ): Promise<StreamableFile> {
    const header = handleStreamHeader('video', body.filters.ext);
    const stream = this.streamService.getStream({ ...body });
    return new StreamableFile(stream, header);
  }
  @Get('trim')
  async setStreamTrimmed(
    @Body() body: TrimmedBodyDto,
  ): Promise<StreamableFile> {
    const header = handleStreamHeader('video', body.filters.ext);
    const stream = this.streamService.getTrimmedStream({ ...body });
    return new StreamableFile(stream, header);
  }

  @Get('merge')
  async setStreamMerged(@Body() body: MergedBodyDto): Promise<StreamableFile> {
    const header = handleStreamHeader('video', body.videoFilters.ext);
    const stream = await this.streamService.getMergedStream({ ...body });
    return new StreamableFile(stream, header);
  }
}

export { MovieStreamController };
