import fs from "fs";
import path from "path";
import { downloadFromInfo } from "./ytdl-provider";
import { videoFormat, videoInfo } from "@distube/ytdl-core";

const cleanupTempFiles = (...filePaths: string[]) => {
  filePaths.forEach((filePath) => {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  });
};

const createTempFolderTree = (dirName: string, ...files: string[]) => {
  fs.mkdirSync(dirName, { recursive: true });
  files.forEach((file) => {
    path.join(dirName, file);
  });
  return [...files];
};

const createReadStream = (path: string) => fs.createReadStream(path);
const createWriteStream = (path: string) => fs.createWriteStream(path);

const streamToFilePromise = (
  info: videoInfo,
  format: videoFormat,
  filePath: string
) => {
  return new Promise<void>((resolve, reject) => {
    const videoDownload = downloadFromInfo(info, format);
    const stream = fs.createWriteStream(filePath);
    videoDownload.pipe(stream);
    videoDownload.on("end", () => {
      resolve();
    });
    videoDownload.on("error", (error) => {
      stream.destroy();
      reject(error);
    });
  });
};

export {
  cleanupTempFiles,
  createTempFolderTree,
  streamToFilePromise,
  createReadStream,
  createWriteStream,
};
