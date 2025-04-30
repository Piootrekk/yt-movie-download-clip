import { Module } from '@nestjs/common';
import { YtdlCoreService } from './ytdl-core.service';
import { YtdlpService } from './ytdlp.service';

@Module({
  providers: [YtdlCoreService, YtdlpService],
})
class DownloadModule {}

export { DownloadModule };
