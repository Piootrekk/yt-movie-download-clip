import Card from "../../../common/components/panel-card/Card";
import FilmIcon from "../../../common/icon/FilmIcon";
import MonitorPlayIcon from "../../../common/icon/MonitorPlayIcon";
import TimerIcon from "../../../common/icon/TimerIcon";
import BoxIcon from "../../../common/icon/BoxIcon";
import LanguagesIcon from "../../../common/icon/LanguagesIcon";
import GaugeIcon from "../../../common/icon/GaugeIcon";

import detailsStyles from "./SelectedDetails.module.css";

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
};

const SelectedDetails = ({
  width,
  height,
  fps,
  audioTrack,
  approxDurationMs,
  container,
  bitrate,
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
      value: approxDurationMs ? approxDurationMs : "NOT SPECIFIED",
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
      value: bitrate ? bitrate : "NOT SPECIFIED",
      icon: GaugeIcon,
    },
  ];

  return (
    <Card>
      <div className={detailsStyles.infoLayout}>
        {basicDetails.map((detail, index) => (
          <div key={index} className={detailsStyles.infoItem}>
            <detail.icon size={48} className={detailsStyles.infoIcon} />
            <span className={detailsStyles.infoTitle}>{detail.title}</span>
            <span className={detailsStyles.infoValue}>{detail.value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default SelectedDetails;
