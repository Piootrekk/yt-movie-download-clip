import { Request, Response, Router } from "express";
import {
  downloadVidoeFromInfo,
  extractVideoId,
  selectFormat,
} from "../services/ytdl-provider";
import { transformError } from "../utlis/error-transform";
import { getVideoInfo } from "../services/ytdl-provider";
import fs from "fs";
const router = Router();
import { zodValidator } from "../utlis/zod-validate";
import { queryVideoSchema } from "../sechemas/query-schemat";
import path from "path";
import { mergeAudioAndVideo } from "../services/ffmeg-provider";
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
    const finalOutputName = `output.mp4`;

    const tempDir = path.resolve(__dirname, "./temp");
    const tempVideoPath = path.join(tempDir, videoOutputName);
    const tempAudioPath = path.join(tempDir, audioOutputName);
    const tempFinalPath = path.join(tempDir, finalOutputName);

    await Promise.all([
      new Promise((resolve, reject) => {
        const videoDownload = downloadVidoeFromInfo(info, videoFormat);
        const videoStream = fs.createWriteStream(tempVideoPath);
        videoDownload.pipe(videoStream);
        videoDownload.on("end", resolve);
        videoDownload.on("error", reject);
      }),
      new Promise((resolve, reject) => {
        const audioDownload = downloadVidoeFromInfo(info, audioFormat);
        const audioStream = fs.createWriteStream(tempAudioPath);
        audioDownload.pipe(audioStream);
        audioDownload.on("end", resolve);
        audioDownload.on("error", reject);
      }),
    ]);

    await mergeAudioAndVideo(tempAudioPath, tempVideoPath, tempFinalPath);

    res.header(
      "Content-Disposition",
      `attachment; filename="${info.videoDetails.title}.mp4"`
    );
    res.header("Content-Type", "video/mp4");
    const finalStream = fs.createWriteStream(tempFinalPath);
    finalStream.pipe(res);
    finalStream.on("end", () => {
      console.log("Donwload complete");
      fs.unlinkSync(tempFinalPath);
      fs.unlinkSync(tempAudioPath);
      fs.unlinkSync(tempVideoPath);
      finalStream.end();
    });

    finalStream.on("close", () => {
      console.log("Download stream closed");
      finalStream.close();
    });
  } catch (error) {
    const errorMessage = transformError(error);
    return res.status(400).json({ message: errorMessage });
  }
});

export default router;
