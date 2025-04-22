import FilmIcon from "../../../common/icon/FilmIcon";
import MonitorPlayIcon from "../../../common/icon/MonitorPlayIcon";
import TimerIcon from "../../../common/icon/TimerIcon";
import BoxIcon from "../../../common/icon/BoxIcon";
import LanguagesIcon from "../../../common/icon/LanguagesIcon";
import GaugeIcon from "../../../common/icon/GaugeIcon";

import detailsStyles from "./SelectedDetails.module.css";
import { formatBitrate, formatSize, formatTime } from "./SelectedDetails.utils";
import FileIcon from "../../../common/icon/FileIcon";

import type {
  TItemWithIcon,
  TVideoDetails,
  TAudioDetails,
} from "./SelectedDetails.types";

type SelectedDetailsProps = {
  video?: TVideoDetails;
  audio?: TAudioDetails;
  both?: TVideoDetails & TAudioDetails;
};

const NOT_SPECIFIED = "NOT SPECIFIED";

const SelectedDetails = ({ video, audio, both }: SelectedDetailsProps) => {
  const { width, height, container, fps, approxDurationMs } =
    video ?? both ?? {};
  const { audioTrack } = audio ?? both ?? {};

  const bothContentLength = both?.contentLength;
  const videoContentLenght = video?.contentLength;
  const audioContentLenght = audio?.contentLength;

  const bothBitrate = both?.bitrate;
  const videoBitrate = video?.bitrate;
  const audioBitrate = audio?.bitrate;

  const basicDetails: TItemWithIcon[] = [
    {
      title: "Resolution",
      value: width && height ? `${width}X${height}` : NOT_SPECIFIED,
      icon: MonitorPlayIcon,
    },
    {
      title: "Fps",
      value: fps ? fps : NOT_SPECIFIED,
      icon: FilmIcon,
    },
    {
      title: "Duration",
      value: approxDurationMs ? formatTime(approxDurationMs) : NOT_SPECIFIED,
      icon: TimerIcon,
    },
    {
      title: "Container",
      value: container ? container : NOT_SPECIFIED,
      icon: BoxIcon,
    },
    {
      title: "Language",
      value: audioTrack ? audioTrack.displayName : NOT_SPECIFIED,
      icon: LanguagesIcon,
    },
    {
      title: "Bitrate",
      value:
        bothBitrate || audioBitrate || videoBitrate
          ? formatBitrate(bothBitrate, audioBitrate, videoBitrate)
          : NOT_SPECIFIED,
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
    <div className={detailsStyles.infoLayout}>
      {basicDetails.map((detail, index) => (
        <div key={index} className={detailsStyles.infoItem}>
          <detail.icon size={48} className={detailsStyles.infoIcon} />
          <h3 className={detailsStyles.infoTitle}>{detail.title}</h3>
          <span className={detailsStyles.infoValue}>{detail.value}</span>
        </div>
      ))}
    </div>
  );
};

export default SelectedDetails;
