import BadgeTag from "../badge-generator/BadgeGenerator";
import resolutionsStyle from "../Resolution.module.css";
import {
  TAudioResolution,
  TBothResolution,
  TVideoResolution,
} from "../videoInfo.api";
import SelectedDetails from "../resolution-details/SelectedDetails";
import { useResolutionSelector } from "./ResolutionList.hook";

type ResolutionListProps = {
  audio: TAudioResolution[];
  video: TVideoResolution[];
  both: TBothResolution[];
};

const ResolutionList = ({ audio, video, both }: ResolutionListProps) => {
  const {
    selectedAudio,
    selectedVideo,
    selectedBoth,
    handleSelectedAudio,
    handleSelectedVideo,
    handleSelectedBoth,
  } = useResolutionSelector(audio, video, both);

  const disableInputs = (
    currentContainer: string,
    selectedContainer?: string
  ) => {
    if (selectedContainer === undefined) return false;
    return selectedContainer !== currentContainer;
  };

  return (
    <>
      <SelectedDetails
        {...{ ...selectedAudio, ...selectedVideo, ...selectedBoth }}
      />
      <div className={resolutionsStyle.filterContainer}>
        <div className={resolutionsStyle.filterColumn}>
          <h2>Audio</h2>
          <div className={resolutionsStyle.filterList}>
            {audio.map((audio) => (
              <div
                key={audio.mimeType + audio.bitrate}
                className={resolutionsStyle.radioOption}
              >
                <input
                  type="checkbox"
                  id={audio.mimeType + audio.bitrate}
                  name="audio"
                  value={audio.url}
                  checked={selectedAudio?.url === audio.url}
                  onChange={handleSelectedAudio}
                  disabled={disableInputs(
                    audio.container,
                    selectedVideo?.container
                  )}
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
            {video.map((video) => (
              <div
                key={video.mimeType + video.bitrate}
                className={resolutionsStyle.radioOption}
              >
                <input
                  type="checkbox"
                  id={video.mimeType + video.bitrate}
                  name="video"
                  value={video.url}
                  checked={selectedVideo?.url === video.url}
                  onChange={handleSelectedVideo}
                  disabled={disableInputs(
                    video.container,
                    selectedAudio?.container
                  )}
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
            {both.map((both) => (
              <div
                key={both.mimeType + both.bitrate}
                className={resolutionsStyle.radioOption}
              >
                <input
                  type="checkbox"
                  id={both.mimeType + both.bitrate}
                  name="both"
                  value={both.url}
                  checked={selectedBoth?.url === both.url}
                  onChange={handleSelectedBoth}
                />
                <label htmlFor={both.mimeType + both.bitrate}>
                  <BadgeTag {...both} />
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ResolutionList;
