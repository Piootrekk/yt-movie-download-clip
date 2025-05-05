import fs from 'fs';
import fsPromise from 'fs/promises';
import { Injectable } from '@nestjs/common';
import { Readable } from 'stream';
import type { TReturnStreamFilesHandler, TStreamFile } from './file.types';

/**
 * Service that utilizes the fs default node package.
 *
 * Provide wrapped method to file operations
 */

@Injectable()
class FsService {
  private readonly pathTempDirectory = './tmp';
  constructor() {
    this.createTempDirIfNotExist();
  }

  private createTempDirIfNotExist(): void {
    if (!fs.existsSync(this.pathTempDirectory))
      fs.mkdirSync(this.pathTempDirectory);
  }

  async createFileFromStream(
    stream: Readable,
    fileName: string,
    extension: string,
  ): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const fileNameHandler = `${this.pathTempDirectory}/${fileName}.${extension}`;
      const fileStream = fs.createWriteStream(fileNameHandler);
      stream
        .pipe(fileStream)
        .on('close', () => resolve(fileNameHandler))
        .on('error', (err) => reject(err));
    });
  }

  async createBulkFilesFromStreams<T extends ReadonlyArray<TStreamFile>>(
    transforms: T,
  ): Promise<TReturnStreamFilesHandler<T>> {
    const entries = await Promise.all(
      transforms.map(async (transform) => {
        const result: string = await this.createFileFromStream(
          transform.stream,
          transform.fileName,
          transform.extension,
        );
        return [transform.fileName, result] as const;
      }),
    );
    return Object.fromEntries(entries) as TReturnStreamFilesHandler<T>;
  }

  async cleanUpFiles(...fileNames: string[]): Promise<void> {
    await Promise.all(
      fileNames.map((filename) => fsPromise.unlink(`${filename}`)),
    );
  }
}

export { FsService };
