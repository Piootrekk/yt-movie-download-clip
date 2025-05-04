import { Readable } from 'stream';

type TStreamFile = {
  stream: Readable;
  fileName: string;
  extension: string;
};

export type { TStreamFile };
