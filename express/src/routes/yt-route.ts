import { Request, Response, Router } from "express";
import { extractVideoId, extractVideoStreams } from "../utlis/yt-utils";
import { transformError } from "../utlis/error-transform";
import axiosInstance from "../utlis/axios-config";
import { TResponseYt } from "../sechemas/yt-schema";

const router = Router();

router.get("/validate-link", async (req: Request, res: Response) => {
  const { link } = req.query;
  if (!link) {
    return res.status(400).json({ message: "Link is required" });
  }
  try {
    const id = extractVideoId(link as string);
    return res.json({ id });
  } catch (error) {
    const errorMessage = transformError(error);
    return res.status(400).json({ message: errorMessage });
  }
});

router.get("/yt-info", async (req: Request, res: Response) => {
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
