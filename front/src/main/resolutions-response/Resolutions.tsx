import { use } from "react";
import { getResolutions } from "./videoInfo.api";
import resolutionsStyle from "./Resolution.module.css";
import BadgeGenerator from "./badge-generator/BadgeGenerator";

type ResolutionsProps = {
  formValues: unknown;
};

const Resolutions = ({ formValues }: ResolutionsProps) => {
  const formatResponse = use(getResolutions(formValues));

  return (
    <div className={resolutionsStyle.container}>
      <div className={resolutionsStyle.filterColumn}>
        <h2>Audio</h2>
        <div className={resolutionsStyle.filterList}>
          {formatResponse.audio.map((audio) => (
            <div key={audio.url} className={resolutionsStyle.radioOption}>
              <input type="radio" id={audio.url} name="audio" />
              <label htmlFor={audio.url}>
                <BadgeGenerator
                  {...audio}
                  audioTrackName={audio.audioTrack?.displayName}
                />
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className={resolutionsStyle.filterColumn}>
        <h2>Video</h2>
        <div className={resolutionsStyle.filterList}>
          {formatResponse.video.map((video) => (
            <div key={video.url} className={resolutionsStyle.radioOption}>
              <input type="radio" id={video.url} name="audio" />
              <label htmlFor={video.url}>
                <BadgeGenerator {...video} />
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className={resolutionsStyle.filterColumn}>
        <h2>Both</h2>
        <div className={resolutionsStyle.filterList}>
          {formatResponse.both.map((both) => (
            <div key={both.url} className={resolutionsStyle.radioOption}>
              <input type="radio" id={both.url} name="audio" />
              <label htmlFor={both.url}>
                <BadgeGenerator {...both} />
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Resolutions;
