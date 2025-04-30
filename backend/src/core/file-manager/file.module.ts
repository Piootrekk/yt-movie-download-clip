import { Module } from '@nestjs/common';
import { FsService } from './fs.service';

@Module({
  providers: [FsService],
})
class FileModule {}

export { FileModule };
