import Card from "../../../common/components/panel-card/Card";
import FilmIcon from "../../../common/icon/FilmIcon";
import MonitorPlayIcon from "../../../common/icon/MonitorPlayIcon";
import TimerIcon from "../../../common/icon/TimerIcon";
import BoxIcon from "../../../common/icon/BoxIcon";
import LanguagesIcon from "../../../common/icon/LanguagesIcon";
import GaugeIcon from "../../../common/icon/GaugeIcon";

import detailsStyles from "./SelectedDetails.module.css";
import { formatBitrate, formatSize, formatTime } from "./SelectedDetails.utils";
import FileIcon from "../../../common/icon/FileIcon";

type TItemWithIcon = {
  icon: React.ComponentType<any>;
  title: string;
  value: string | number;
};

type SelectedDetailsProps = {
  width?: number;
  height?: number;
  fps?: number;
  audioTrack?: {
    displayName: string;
  };
  approxDurationMs?: string;
  container?: string;
  bitrate?: number;
  bothContentLength?: string;
  audioContentLenght?: string;
  videoContentLenght?: string;
};

const basicManual = {
  title: "YouTube Video Downloader",
  instruction:
    "Choose from available video and audio formats to download your preferred version. Select separetly audio/video or merged both.",
};

const SelectedDetails = ({
  width,
  height,
  fps,
  audioTrack,
  approxDurationMs,
  container,
  bitrate,
  bothContentLength,
  videoContentLenght,
  audioContentLenght,
}: SelectedDetailsProps) => {
  const basicDetails: TItemWithIcon[] = [
    {
      title: "Resolution",
      value: width && height ? `${width}X${height}` : "NOT SPECIFIED",
      icon: MonitorPlayIcon,
    },
    {
      title: "Fps",
      value: fps ? fps : "NOT SPECIFIED",
      icon: FilmIcon,
    },
    {
      title: "Duration",
      value: approxDurationMs ? formatTime(approxDurationMs) : "NOT SPECIFIED",
      icon: TimerIcon,
    },
    {
      title: "Container",
      value: container ? container : "NOT SPECIFIED",
      icon: BoxIcon,
    },
    {
      title: "Language",
      value: audioTrack ? audioTrack.displayName : "NOT SPECIFIED",
      icon: LanguagesIcon,
    },
    {
      title: "Bitrate",
      value: bitrate ? formatBitrate(bitrate) : "NOT SPECIFIED",
      icon: GaugeIcon,
    },
    {
      title: "File size",
      value:
        bothContentLength || audioContentLenght || videoContentLenght
          ? formatSize(
              bothContentLength,
              audioContentLenght,
              videoContentLenght
            )
          : "NOT SPECIFED",
      icon: FileIcon,
    },
  ];
  return (
    <Card>
      <div className={detailsStyles.baseManual}>
        <h3>{basicManual.title}</h3>
        <span>{basicManual.instruction}</span>
      </div>
      <div className={detailsStyles.infoLayout}>
        {basicDetails.map((detail, index) => (
          <div key={index} className={detailsStyles.infoItem}>
            <detail.icon size={48} className={detailsStyles.infoIcon} />
            <h3 className={detailsStyles.infoTitle}>{detail.title}</h3>
            <span className={detailsStyles.infoValue}>{detail.value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default SelectedDetails;
