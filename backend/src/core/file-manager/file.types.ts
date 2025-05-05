import { Readable } from 'stream';

type TStreamFile = {
  stream: Readable;
  fileName: string;
  extension: string;
};

type TReturnStreamFilesHandler<T extends ReadonlyArray<TStreamFile>> = {
  [K in T[number]['fileName']]: string;
};

export type { TStreamFile, TReturnStreamFilesHandler };
