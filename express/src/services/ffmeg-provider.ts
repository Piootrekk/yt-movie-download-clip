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
      .outputOptions(["-c:v copy", "-c:a aac", "-map 1:a:0", "-map 0:v:0"])
      .output(outputPath)
      .on("end", () => {
        console.log("Merging audio and video is done");
        resolve(true);
      })
      .on("error", (err) => {
        console.error("Error while merging audio and video", err);
        reject(err);
      })
      .save(outputPath);
  });
};

export { mergeAudioAndVideo };
