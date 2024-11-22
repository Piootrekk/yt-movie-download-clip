import { Router } from "express";

const router = Router();

router.get("/", (_, res) => {
  res.send("Express + TypeScript Server");
});

router.all("/*", (_, res) => {
  res.status(404).json({ message: "Not Found" });
});

export default router;
