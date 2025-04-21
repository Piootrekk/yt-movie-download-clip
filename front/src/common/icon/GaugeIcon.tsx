import clsx from "clsx";
import iconStyles from "./Icon.module.css";
import type { IconProps } from "./generic-icon.types";

const GaugeIcon = ({ size, width, height, className }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size ?? width}
      height={size ?? height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={clsx(iconStyles.icon, className)}
    >
      <path d="m12 14 4-4" />
      <path d="M3.34 19a10 10 0 1 1 17.32 0" />
    </svg>
  );
};

export default GaugeIcon;
