// example material with https://www.youtube.com/shorts/Y3vewCcuNpI

declare module '@distube/ytdl-core' {
  export interface videoFormat {
    audioTrack?: {
      displayName: string;
      id: string;
      audioIsDefault: boolean;
    };
  }
}
