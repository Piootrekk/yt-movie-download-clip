import { Module } from '@nestjs/common';
import { DownloadModule } from 'src/core/download-manager/download.module';
import { EditModule } from 'src/core/edit-manager/edit.module';
import { FileModule } from 'src/core/file-manager/file.module';
import { MovieInfoController } from './movie-info/movie-info.controller';
import { MovieStreamController } from './streams/stream.controller';
import { MovieInfoService } from './movie-info/movie-info.service';
import { StreamService } from './streams/stream.service';
import { MovieInfoMapper } from './movie-info/movie-info.mapper';

@Module({
  controllers: [MovieInfoController, MovieStreamController],
  imports: [DownloadModule, FileModule, EditModule],
  providers: [MovieInfoService, MovieInfoMapper, StreamService],
})
class YtMoviesV2Module {}

export { YtMoviesV2Module };
