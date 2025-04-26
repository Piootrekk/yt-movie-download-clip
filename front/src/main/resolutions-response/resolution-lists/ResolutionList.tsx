import resolutionsStyle from "../Resolution.module.css";
import type {
  TAudioResolution,
  TBothResolution,
  TVideoResolution,
} from "../videoInfo.api";
import SelectedDetails from "../resolution-details/SelectedDetails";
import { useResolutionSelector } from "./ResolutionList.hook";
import Card from "../../../common/components/panel-card/Card";
import BasicInfo from "../resolution-details/BasicInfo";
import StreamForm from "../stream-form/StreamForm";
import InputsSelectGroup, {
  TInputData,
} from "../input-select/InputsSelectGroup";

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

  const inputsData = [
    {
      header: "Audio",
      selectedValue: selectedAudio,
      values: audio,
      handleChange: handleSelectedAudio,
    },
    {
      header: "Video",
      selectedValue: selectedVideo,
      values: video,
      handleChange: handleSelectedVideo,
    },
    {
      header: "Both",
      selectedValue: selectedBoth,
      values: both,
      handleChange: handleSelectedBoth,
    },
  ] satisfies TInputData[];

  return (
    <>
      <Card>
        <BasicInfo />
        <StreamForm
          video={selectedVideo}
          audio={selectedAudio}
          both={selectedBoth}
        />
      </Card>
      <Card>
        <SelectedDetails
          video={selectedVideo}
          audio={selectedAudio}
          both={selectedBoth}
        />
      </Card>

      <div className={resolutionsStyle.filterContainer}>
        {inputsData.map((input) => (
          <InputsSelectGroup {...input} />
        ))}
      </div>
    </>
  );
};

export default ResolutionList;
