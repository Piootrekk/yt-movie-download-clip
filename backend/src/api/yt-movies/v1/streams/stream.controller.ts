import { Body, Controller, Get, Query, StreamableFile } from '@nestjs/common';
import { StreamService } from './stream.service';
import { StreamByItagQueryDto } from './dto/stream-query.dto';

@Controller('v1/yt-movie')
class MovieStreamController {
  constructor(private streamService: StreamService) {}

  @Get('stream/all')
  async getStreamById(@Query() query: StreamByItagQueryDto) {
    const stream = this.streamService.getStreamById(
      query.url,
      query.itag,
      query.clients,
      query.chunkSize,
    );
    return new StreamableFile(stream);
  }
}

export { MovieStreamController };
