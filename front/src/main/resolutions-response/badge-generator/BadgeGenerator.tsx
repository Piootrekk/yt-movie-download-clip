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
    { content: itag, style: badgeStyles.formatTag },
    { content: qualityLabel, style: badgeStyles.qualityTag },
    { content: audioQuality, style: badgeStyles.qualityTag },
    { content: fps, style: badgeStyles.fpsTag },
    { content: audioCodec, style: badgeStyles.codecTag },
    { content: videoCodec, style: badgeStyles.codecTag },
    { content: container, style: badgeStyles.containerTag },
    { content: audioTrackName, style: badgeStyles.languageTag },
  ] as const;

  return (
    <>
      {badges.map(
        (badge, index) =>
          badge.content && (
            <span
              key={index}
              className={`${badge.style} ${badgeStyles.defaultSpan}`}
            >
              {badge.content}
            </span>
          )
      )}
    </>
  );
};

export default BadgeTag;
