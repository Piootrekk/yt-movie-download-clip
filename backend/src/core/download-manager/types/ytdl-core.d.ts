// example material with https://www.youtube.com/shorts/Y3vewCcuNpI
// https://www.youtube.com/watch?v=_l5Q5kKHtR8
declare module '@distube/ytdl-core' {
  export interface videoFormat {
    audioTrack?: {
      displayName: string;
      id: string;
      audioIsDefault: boolean;
    };
  }
}
