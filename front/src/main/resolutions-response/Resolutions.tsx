import { use } from "react";
import { getResolutions } from "./videoInfo.api";
import resolutionsStyle from "./Resolution.module.css";
import BadgeTag from "./badge-generator/BadgeGenerator";
import TechnicalDetails from "./technical-details/TechnicalDetails";

type ResolutionsProps = {
  formValues: unknown;
};

const Resolutions = ({ formValues }: ResolutionsProps) => {
  const formatResponse = use(getResolutions(formValues));

  return (
    <div className={resolutionsStyle.container}>
      <div className={resolutionsStyle.filterContainer}>
        <div className={resolutionsStyle.filterColumn}>
          <h2>Audio</h2>
          <div className={resolutionsStyle.filterList}>
            {formatResponse.audio.map((audio) => (
              <div
                key={audio.mimeType + audio.bitrate}
                className={resolutionsStyle.radioOption}
              >
                <input
                  type="radio"
                  id={audio.mimeType + audio.bitrate}
                  name="audio"
                />
                <label htmlFor={audio.mimeType + audio.bitrate}>
                  <BadgeTag
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
              <div
                key={video.mimeType + video.bitrate}
                className={resolutionsStyle.radioOption}
              >
                <input
                  type="radio"
                  id={video.mimeType + video.bitrate}
                  name="video"
                />
                <label htmlFor={video.mimeType + video.bitrate}>
                  <BadgeTag {...video} />
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className={resolutionsStyle.filterColumn}>
          <h2>Both</h2>
          <div className={resolutionsStyle.filterList}>
            {formatResponse.both.map((both) => (
              <div
                key={both.mimeType + both.bitrate}
                className={resolutionsStyle.radioOption}
              >
                <input
                  type="radio"
                  id={both.mimeType + both.bitrate}
                  name="both"
                />
                <label htmlFor={both.mimeType + both.bitrate}>
                  <BadgeTag {...both} />
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <TechnicalDetails />
    </div>
  );
};
export default Resolutions;
