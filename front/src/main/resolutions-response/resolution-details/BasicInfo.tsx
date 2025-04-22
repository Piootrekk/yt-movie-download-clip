import detailsStyles from "./SelectedDetails.module.css";

const basicManual = {
  title: "YouTube Video Downloader",
  instruction:
    "Choose from available video and audio formats to download your preferred version. Select separetly audio/video or merged both. If selected click button fetch stream.",
};

const BasicInfo = () => {
  return (
    <div className={detailsStyles.baseManual}>
      <h3>{basicManual.title}</h3>
      <span>{basicManual.instruction}</span>
    </div>
  );
};

export default BasicInfo;
