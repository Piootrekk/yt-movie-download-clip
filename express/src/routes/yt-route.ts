import { Request, Response, Router } from "express";
import {
  downloadVidoeFromInfo,
  extractVideoId,
  selectFormat,
} from "../services/ytdl-provider";
import { transformError } from "../utlis/error-transform";
import { getVideoInfo } from "../services/ytdl-provider";

const router = Router();
import { zodValidator } from "../utlis/zod-validate";
import { queryVideoSchema } from "../sechemas/query-schemat";

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

router.get("/download-full-video", async (req: Request, res: Response) => {
  try {
    const videoUrl = zodValidator(queryVideoSchema, req.query.videoUrl);
    const info = await getVideoInfo(videoUrl);
    const format = selectFormat(info.formats, "137");
    const outputFilePath = `${info.videoDetails.title}.${format.container}`;
    res.header(
      "Content-Disposition",
      `attachment; filename="${outputFilePath}"`
    );
    res.header("Content-Type", format.mimeType);
    const download = downloadVidoeFromInfo(info, format);
    download.pipe(res);
    download.on("error", (error) => {
      throw new Error(` Error emit: ${error.message}`);
    });
    download.on("finish", () => {
      console.log("Download has been completed");
    });
    return res.json({ message: "Download has been started" });
  } catch (error) {
    const errorMessage = transformError(error);
    return res.status(400).json({ message: errorMessage });
  }
});

export default router;
