import ffmpeg from "fluent-ffmpeg";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const mergeAudioAndVideo = async (
  audioPath: string,
  videoPath: string,
  outputPath: string
) => {
  await new Promise((resolve, reject) => {
    ffmpeg()
      .input(videoPath)
      .input(audioPath)
      .videoCodec("copy")
      .audioCodec("aac")
      .output(outputPath)
      .on("error", (err) => {
        console.error("Detailed FFmpeg Error:", err);
        reject(err);
      })
      .on("end", () => {
        console.log("ffmpeg processing finished");
        resolve(null);
      })
      .run();
  });
};

export { mergeAudioAndVideo };
