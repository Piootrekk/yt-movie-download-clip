const getFfmpegPath = (): string | undefined => {
  const { FFMPEG_PATH } = process.env;
  return FFMPEG_PATH;
};

const getPort = (): number => {
  const { PORT } = process.env;
  return PORT ? Number(PORT) : 3000;
};

const env = {
  getFfmpegPath,
  getPort,
};

export { env };
