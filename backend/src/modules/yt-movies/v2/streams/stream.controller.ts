import { Controller, Get, Query, StreamableFile } from '@nestjs/common';
import { StreamService } from './stream.service';
import { StreamByItagQuery } from './dto/stream-itag-query.dto';

@Controller('v2/yt-movie')
class MovieStreamController {
  constructor(private streamService: StreamService) {}
  @Get('all')
  async getStream(@Query() query: StreamByItagQuery) {
    const stream = this.streamService.getStream({ ...query });
    return new StreamableFile(stream);
  }
}

export { MovieStreamController };
