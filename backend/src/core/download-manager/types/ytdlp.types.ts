import { videoFormat } from '@distube/ytdl-core';

type TYtdlpInfo = {
  id: string;
  title: string;
  formats: TYtDlpFormat[];
};

type TYtDlpFormat = {
  format_id: string;
  format_note: string;
  ext: string;
  protocol: string;
  acodec: string;
  vcodec: string;
  url: string;
  width?: number;
  height?: number;
  fps?: number;
  rows: number;
  columns: number;
  fragmets: Record<string, string>[];
  audio_ext: string;
  video_ext: string;
};

type TFiltersGroup = {
  audio: TYtDlpFormat[];
  video: TYtDlpFormat[];
  both: TYtDlpFormat[];
};

type TFilters = {
  audio: videoFormat[];
  video: videoFormat[];
  both: videoFormat[];
};

export type { TYtdlpInfo, TYtDlpFormat, TFiltersGroup, TFilters };
