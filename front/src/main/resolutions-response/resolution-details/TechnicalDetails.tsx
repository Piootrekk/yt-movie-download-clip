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
    value: "The format used to compress and encode the video or audio stream.",
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
    value:
      "Audio track language. If no specific language option is available, the default language is typically set to English.",
  },
  {
    name: "Bitrate",
    value:
      "The amount of data processed per second in the stream. Higher bitrates generally mean better video or audio quality, but also require more bandwidth for streaming or downloading.",
  },
  {
    name: "Size",
    value:
      "Estimated file size based on the selected audio and video streams. Higher-quality formats tend to have larger sizes and may take longer to download or stream, depending on the bitrate and duration.",
  },
];

const title = "Technical Details:";

const TechnicalDetails = () => {
  return <PanelCard heading={title} items={technicalDetails} />;
};

export default TechnicalDetails;
