import { useState } from "react";
import BadgeTag from "../badge-generator/BadgeGenerator";
import resolutionsStyle from "../Resolution.module.css";
import {
  TAudioResolution,
  TBothResolution,
  TVideoResolution,
} from "../videoInfo.api";
import SelectedDetails from "../resolution-details/SelectedDetails";
import { isEqual } from "../../../common/utils/equal";

type ResolutionListProps = {
  audio: TAudioResolution[];
  video: TVideoResolution[];
  both: TBothResolution[];
};

const ResolutionList = ({ audio, video, both }: ResolutionListProps) => {
  const [selectedAudio, setSelectedAudio] = useState<
    TAudioResolution | undefined
  >(undefined);
  const [selectedVideo, setSelectedVideo] = useState<
    TVideoResolution | undefined
  >(undefined);
  const [selectedBoth, setSelectedBoth] = useState<TBothResolution | undefined>(
    undefined
  );

  const handleSelectedAudio = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const newSelectedAudio: TAudioResolution = JSON.parse(e.target.value);
    setSelectedAudio((prev) => {
      if (isEqual(prev, newSelectedAudio)) return undefined;
      return newSelectedAudio;
    });
  };
  const handleSelectedVideo = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const newSelectedVideo: TVideoResolution = JSON.parse(e.target.value);

    setSelectedVideo((prev) => {
      if (isEqual(prev, newSelectedVideo)) return undefined;
      return newSelectedVideo;
    });
  };
  const handleSelectedBoth = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newSelectedBoth: TBothResolution = JSON.parse(e.target.value);
    setSelectedBoth((prev) => {
      if (isEqual(prev, newSelectedBoth)) return undefined;
      return newSelectedBoth;
    });
  };

  return (
    <>
      <SelectedDetails
        {...{ ...selectedAudio, ...selectedVideo, ...selectedBoth }}
        language={selectedAudio?.audioTrack?.displayName}
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
                  type="radio"
                  id={audio.mimeType + audio.bitrate}
                  name="audio"
                  value={JSON.stringify(selectedAudio)}
                  onChange={handleSelectedAudio}
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
                  type="radio"
                  id={video.mimeType + video.bitrate}
                  name="video"
                  value={JSON.stringify(selectedVideo)}
                  onChange={handleSelectedVideo}
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
                  type="radio"
                  id={both.mimeType + both.bitrate}
                  name="both"
                  value={JSON.stringify(selectedBoth)}
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
