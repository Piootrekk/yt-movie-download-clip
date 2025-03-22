import fs from 'fs';
import fsPromise from 'fs/promises';
import { pipeline } from 'stream/promises';
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

  async createFilesFromStreams(container: string, ...streams: Readable[]) {
    const writePromise = streams.map(async (stream, index) => {
      const fileName = `${this.pathTempDirectory}/stream-${index}.${container}`;
      await fsPromise.writeFile(fileName, stream);
      return fileName;
    });
    return Promise.all(writePromise);
  }

  async createFileFromStream(
    container: string,
    stream: Readable,
  ): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const fileName = `${this.pathTempDirectory}/stream-${Date.now()}.${container}`;
      const fileHandler = fs.createWriteStream(fileName);
      stream
        .pipe(fileHandler)
        .on('close', () => resolve(fileName))
        .on('error', (err) => reject(err));
    });
  }

  async cleanUpFiles(...fileNames: string[]): Promise<void> {
    await Promise.all(
      fileNames.map((filename) => fsPromise.unlink(`${filename}`)),
    );
  }
}

export { FsService };
