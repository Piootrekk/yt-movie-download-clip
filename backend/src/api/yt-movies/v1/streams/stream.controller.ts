import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  StreamableFile,
} from '@nestjs/common';
import { StreamService } from './stream.service';
import { StreamByItagQueryDto } from './dto/stream-itag-query.dto';
import { StreamByFiltersBodyDto } from './dto/stream-filters-body.dto';

@Controller('yt-movie/v1/stream')
class MovieStreamController {
  constructor(private streamService: StreamService) {}

  @Get('all')
  async getStreamById(
    @Query() query: StreamByItagQueryDto,
  ): Promise<StreamableFile> {
    const stream = await this.streamService.getStreamById(
      query.url,
      query.itag,
      query.clients,
      query.chunkSize,
    );
    return new StreamableFile(stream);
  }

  @Post('all')
  async setStreamByFilters(@Body() body: StreamByFiltersBodyDto) {
    const stream = this.streamService.streamVideo(
      body.url,
      body.filters,
      body.chunkSize,
    );
    return new StreamableFile(stream);
  }
}

export { MovieStreamController };
