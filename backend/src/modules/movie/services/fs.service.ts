import fs from 'fs';
import fsPromise from 'fs/promises';
import fsStreamPromise from 'stream/promises';
import { Injectable } from '@nestjs/common';
import { Readable } from 'stream';

@Injectable()
class FsService {
  private readonly pathTempDirectory = './tmp';
  constructor() {
    this.createTempFolderIfNotExist();
  }
  private createTempFolderIfNotExist(): void {
    if (!fs.existsSync(this.pathTempDirectory))
      fs.mkdirSync(this.pathTempDirectory);
  }

  async createFilesFromStreams(
    container: string,
    ...streams: Readable[]
  ): Promise<string[]> {
    const fileNames: string[] = [];
    const writePromises = streams.map((stream, index) => {
      const fileName = `file_${index}.${container}`;
      const writeStream = fs.createWriteStream(fileName);

      fileNames.push(fileName);

      return fsStreamPromise.pipeline(stream, writeStream);
    });
    await Promise.all(writePromises);
    return fileNames;
  }

  async cleanUpFiles(fileNames: string[]): Promise<void> {
    await Promise.all(fileNames.map((filename) => fsPromise.unlink(filename)));
  }
}

export { FsService };
