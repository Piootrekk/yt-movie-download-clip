import { use } from "react";
import { getResolutions } from "./videoInfo.api";
import resolutionsStyle from "./Resolution.module.css";

type ResolutionsProps = {
  formValues: unknown;
};

const Resolutions = ({ formValues }: ResolutionsProps) => {
  const formatResponse = use(getResolutions(formValues));

  return (
    <div className={resolutionsStyle.container}>
      <div className={resolutionsStyle.section}>
        <h2>Audio</h2>
        {formatResponse.audio.map((a) => {
          return (
            <span key={a.url}>
              {a.itag}|{a.qualityLabel}|{a.fps}|{a.audioCodec}|{a.container}{" "}
              {a.audioTrack && `|` + a.audioTrack.displayName}
            </span>
          );
        })}
      </div>
      <div className={resolutionsStyle.section}>
        <h2>Video</h2>
        {formatResponse.video.map((v) => {
          return (
            <span key={v.url}>
              {v.itag}|{v.qualityLabel}|{v.fps}|{v.videoCodec}|{v.container}
            </span>
          );
        })}
      </div>
      <div className={resolutionsStyle.section}>
        <h2>Both</h2>
        {formatResponse.both.map((b) => {
          return (
            <span key={b.url}>
              {b.itag}|{b.qualityLabel}|{b.fps}|{b.audioCodec}-{b.videoCodec}|
              {b.container} {b.audioTrack && `| ` + b.audioTrack.displayName}
            </span>
          );
        })}
      </div>
    </div>
  );
};
export default Resolutions;
