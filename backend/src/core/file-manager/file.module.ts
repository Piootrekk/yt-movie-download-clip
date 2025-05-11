import { Module } from '@nestjs/common';
import { FsService } from './fs.service';
@Module({
  providers: [FsService],
  exports: [FsService],
})
class FileModule {}

export { FileModule };
