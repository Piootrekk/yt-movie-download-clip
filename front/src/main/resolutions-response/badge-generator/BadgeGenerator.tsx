import { ReactNode } from "react";
import badgeStyles from "./BadgeGenerator.module.css";

type BadgeGeneratorProps = {
  itag?: number;
  qualityLabel?: string;
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

const BadgeGenerator = ({
  itag,
  qualityLabel,
  fps,
  audioCodec,
  videoCodec,
  container,
  audioTrackName,
}: BadgeGeneratorProps) => {
  const badges: TBadge[] = [
    { content: itag, style: badgeStyles.formatTag },
    { content: qualityLabel, style: badgeStyles.qualityTag },
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

export default BadgeGenerator;
