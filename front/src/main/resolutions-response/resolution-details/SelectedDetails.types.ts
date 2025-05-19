type TItemWithIcon = {
  icon: React.ComponentType<unknown>;
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
