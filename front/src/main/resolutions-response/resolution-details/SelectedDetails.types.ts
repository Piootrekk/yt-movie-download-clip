type TItemWithIcon<T = {}> = {
  icon: React.ComponentType<T>;
  title: string;
  value: string | number;
};

type TVideoDetails = {
  width?: number;
  height?: number;
  fps?: number;
  approxDurationMs?: string;
  container?: string;
  bitrate?: number;
  contentLength?: string;
};

type TAudioDetails = {
  approxDurationMs?: string;
  container?: string;
  bitrate?: number;
  contentLength?: string;
  audioTrack?: {
    displayName: string;
  };
};

export type { TItemWithIcon, TVideoDetails, TAudioDetails };
