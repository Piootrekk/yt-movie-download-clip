import { Router } from "express";
import ytRoute from "./yt-route";
import ytOldRoute from "./old-yt-route";

const router = Router();

router.use(ytRoute, ytOldRoute);
router.get("/", (_, res) => {
  res.send("Express + TypeScript Server");
});

router.all("/*", (_, res) => {
  res.status(404).json({ message: "Not Found" });
});

export default router;
