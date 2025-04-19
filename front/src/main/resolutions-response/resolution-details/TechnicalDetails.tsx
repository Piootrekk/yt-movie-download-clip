import PanelCard, {
  TListItems,
} from "../../../common/components/panel-card/PanelCard";

const technicalDetails: TListItems[] = [
  { name: "Itag", value: "Unique identifier for the stream format." },
  {
    name: "Quality",
    value: "The resolution or audio quality of the stream.",
  },
  {
    name: "Codec",
    value: "he format used to compress and encode the video or audio stream.",
  },
  {
    name: "Container",
    value: "The file format that holds both video and audio (mp4, webm).",
  },
  {
    name: "FPS",
    value: "Number of frames displayed per second in the video",
  },
  {
    name: "Language",
    value: "Audio track language",
  },
];

const basicManual = {
  title: "YouTube Video Downloader",
  instruction:
    "Choose from available video and audio formats to download your preferred version. Select separetly audio/video or merged both.",
};

const title = "Technical Details:";

const TechnicalDetails = () => {
  return <PanelCard heading={title} items={technicalDetails} />;
};

export default TechnicalDetails;
