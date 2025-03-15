import { Request, response, Response, Router } from "express";
import { extractVideoId, selectFormat } from "../services/ytdl-provider";
import { transformError } from "../utlis/error-transform";
import { getVideoInfo } from "../services/ytdl-provider";
import { zodValidator } from "../utlis/zod-validate";
import { queryVideoSchema } from "../sechemas/query-schemat";
import { mergeAudioAndVideo } from "../services/ffmeg-provider";
import {
  cleanupTempFiles,
  createReadStream,
  createTempFolderTree,
  streamToFilePromise,
} from "../services/file-manipulations";

const router = Router();

router.get("/validate-link", async (req: Request, res: Response) => {
  try {
    const videoUrl = zodValidator(queryVideoSchema, req.query.videoUrl);
    const id = await extractVideoId(videoUrl);
    return res.json({ id });
  } catch (error) {
    const errorMessage = transformError(error);
    return res.status(400).json({ message: errorMessage });
  }
});

router.get("/video-info", async (req: Request, res: Response) => {
  try {
    const videoUrl = zodValidator(queryVideoSchema, req.query.videoUrl);
    const id = await getVideoInfo(videoUrl);
    return res.json({ id });
  } catch (error) {
    const errorMessage = transformError(error);
    return res.status(400).json({ message: errorMessage });
  }
});

router.get("/info-formats", async (req: Request, res: Response) => {
  try {
    const videoUrl = zodValidator(queryVideoSchema, req.query.videoUrl);
    const info = await getVideoInfo(videoUrl);

    const audio = info.formats.filter((f) => f.hasAudio);
    const video = info.formats.filter((f) => f.hasVideo);
    const both = info.formats.filter((f) => f.hasAudio && f.hasVideo);

    return res.json({ audio, video, both });
  } catch (error) {
    const errorMessage = transformError(error);
    return res.status(400).json({ message: errorMessage });
  }
});

router.get("/download-full-video", async (req: Request, res: Response) => {
  try {
    const videoUrl = zodValidator(queryVideoSchema, req.query.videoUrl);
    const info = await getVideoInfo(videoUrl);
    const videoFormat = selectFormat(info.formats, "137");
    const audioFormat = selectFormat(info.formats, "140");

    const videoOutputName = `video.${videoFormat.container}`;
    const audioOutputName = `audio.${audioFormat.container}`;
    const outputName = `output.${
      videoFormat.container || audioFormat.container
    }`;

    const [tempVideoPath, tempAudioPath, outputPath] = createTempFolderTree(
      "./temp",
      videoOutputName,
      audioOutputName,
      outputName
    );
    await Promise.all([
      streamToFilePromise(info, videoFormat, tempVideoPath),
      streamToFilePromise(info, audioFormat, tempAudioPath),
    ]);

    await mergeAudioAndVideo(tempAudioPath, tempVideoPath, outputPath);
    const outputStream = createReadStream(outputPath);
    res.setHeader("Content-Disposition", `attachment; filename=${outputName}`);
    res.setHeader(
      `Content-Type`,
      `${videoFormat.mimeType || audioFormat.mimeType}`
    );
    outputStream
      .pipe(res)
      .on("error", (err) => {
        outputStream.destroy();
        cleanupTempFiles(tempAudioPath, tempVideoPath, outputPath);
        throw err;
      })
      .on("finish", () => {
        cleanupTempFiles(tempAudioPath, tempVideoPath, outputPath);
      });
  } catch (error) {
    const errorMessage = transformError(error);
    if (!res.headersSent) {
      return res.status(400).json({ message: errorMessage });
    }
    console.error("Unhandled error:", error);
  }
});

export default router;
