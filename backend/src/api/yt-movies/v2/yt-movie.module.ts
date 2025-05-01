import { Module } from '@nestjs/common';
import { DownloadModule } from 'src/core/download-manager/download.module';
import { EditModule } from 'src/core/edit-manager/edit.module';
import { FileModule } from 'src/core/file-manager/file.module';
import { MovieInfoController } from './controllers/movie-info.controller';
import { MovieStreamController } from './controllers/stream.controller';

@Module({
  controllers: [MovieInfoController, MovieStreamController],
  imports: [DownloadModule, FileModule, EditModule],
})
class YtMoviesV2Module {}

export { YtMoviesV2Module };
