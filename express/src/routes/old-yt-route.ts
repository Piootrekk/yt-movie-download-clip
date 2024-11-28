import { Router, Request, Response } from "express";
import { extractVideoId, extractVideoStreams } from "../utlis/old-yt-utils";
import axiosInstance from "../utlis/axios-config";
import { transformError } from "../utlis/error-transform";

const router = Router();

router.get("/old-yt-info", async (req: Request, res: Response) => {
  const { link } = req.query;
  if (!link) {
    return res.status(400).json({ message: "Link is required" });
  }
  try {
    const videoId = extractVideoId(link as string);
    const url = `https://www.youtube.com/watch?v=${videoId}`;
    const resp = await axiosInstance.get<string>(url);
    const pageContent = resp.data;

    const playerResponseMatch = pageContent.match(
      /ytInitialPlayerResponse\s*=\s*(\{.+?\});/
    );
    if (!playerResponseMatch) {
      throw new Error("Cannot extract video info");
    }

    const extractedData = await extractVideoStreams(pageContent);
    return res.json(extractedData);
  } catch (error) {
    const errorMessage = transformError(error);
    return res.status(400).json({ message: errorMessage });
  }
});

export default router;
