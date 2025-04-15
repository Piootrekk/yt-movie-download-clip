import { ReactNode } from "react";
import badgeStyles from "./BadgeGenerator.module.css";

type BadgeTagProps = {
  itag?: number;
  qualityLabel?: string;
  audioQuality?: string;
  fps?: number;
  audioCodec?: string;
  videoCodec?: string;
  container?: string;
  audioTrackName?: string;
};

type TBadge = {
  content?: ReactNode;
  style: string;
  tooltip?: string;
};

const BadgeTag = ({
  itag,
  qualityLabel,
  audioQuality,
  fps,
  audioCodec,
  videoCodec,
  container,
  audioTrackName,
}: BadgeTagProps) => {
  const badges: TBadge[] = [
    { content: itag, style: badgeStyles.formatTag, tooltip: "Itag" },
    {
      content: qualityLabel,
      style: badgeStyles.qualityTag,
      tooltip: "Quality",
    },
    {
      content: audioQuality,
      style: badgeStyles.qualityTag,
      tooltip: "Quality",
    },
    { content: fps, style: badgeStyles.fpsTag, tooltip: "FPS" },
    { content: audioCodec, style: badgeStyles.codecTag, tooltip: "Codec" },
    { content: videoCodec, style: badgeStyles.codecTag, tooltip: "Codec" },
    {
      content: container,
      style: badgeStyles.containerTag,
      tooltip: "Container",
    },
    {
      content: audioTrackName,
      style: badgeStyles.languageTag,
      tooltip: "Language",
    },
  ] as const;

  return (
    <>
      {badges.map(
        (badge, index) =>
          badge.content && (
            <span
              key={index}
              className={`${badge.style} ${badgeStyles.defaultSpan}`}
              title={badge.tooltip}
            >
              {badge.content}
            </span>
          )
      )}
    </>
  );
};

export default BadgeTag;
