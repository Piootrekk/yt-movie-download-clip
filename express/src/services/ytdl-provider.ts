import ytdl, { videoFormat, videoInfo } from "@distube/ytdl-core";

const extractVideoId = async (url: string): Promise<string> => {
  const videoId = ytdl.getURLVideoID(url);
  return videoId;
};

const getVideoInfo = async (url: string) => {
  const info = await ytdl.getInfo(url);
  return info;
};

const validateURL = (url: string): boolean => {
  return ytdl.validateURL(url);
};

const selectFormat = (formats: videoFormat[], quality: string) => {
  //  @TODO validate quality if exist in itag
  return ytdl.chooseFormat(formats, { quality });
};

const downloadVidoeFromInfo = (info: videoInfo, format: videoFormat) => {
  const download = ytdl.downloadFromInfo(info, { format });
  return download;
};

export {
  extractVideoId,
  downloadVidoeFromInfo,
  validateURL,
  selectFormat,
  getVideoInfo,
};
