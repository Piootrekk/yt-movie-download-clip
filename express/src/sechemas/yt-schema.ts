import { z } from "zod";
const formatsYtSchema = z.object({
  itag: z.number(),
  mimeType: z.string(),
  bitrate: z.number(),
  width: z.number(),
  height: z.number(),
  lastModified: z.string(),
  contentLength: z.string(),
  quality: z.string(),
  fps: z.number(),
  qualityLabel: z.string(),
  projectionType: z.string(),
  averageBitrate: z.number(),
  audioQuality: z.string(),
  approxDurationMs: z.string(),
  audioSampleRate: z.string(),
  audioChannels: z.number(),
  signatureCipher: z.string(),
});
const adaptiveFormatsYtSchema = z.object({
  itag: z.number(),
  mimeType: z.string(),
  bitrate: z.number(),
  width: z.number(),
  height: z.number(),
  initRange: z.object({
    start: z.string(),
    end: z.string(),
  }),
  indexRange: z.object({
    start: z.string(),
    end: z.string(),
  }),
  lastModified: z.string(),
  contentLength: z.string(),
  quality: z.string(),
  fps: z.number(),
  qualityLabel: z.string(),
  projectionType: z.string(),
  averageBitrate: z.number(),
  approxDurationMs: z.string(),
  signatureCipher: z.string(),
});
const responseYtSchema = z.object({
  expiresInSeconds: z.string(),
  formats: z.array(formatsYtSchema),
  adaptiveFormats: z.array(adaptiveFormatsYtSchema),
});
type TResponseYt = z.infer<typeof responseYtSchema>;
export { responseYtSchema };
export type { TResponseYt };
