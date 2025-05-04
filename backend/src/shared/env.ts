const getFfmpegPath = (): string | undefined => {
  const { FFMPEG_PATH } = process.env;
  return FFMPEG_PATH;
};

const env = {
  getFfmpegPath,
};

export { env };
