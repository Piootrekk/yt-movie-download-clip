import clsx from "clsx";
import type { ErrorIconProps } from "./generic-error.types";
import iconStyles from "./Icon.module.css";

const LanguagesIcon = ({ size, width, height, className }: ErrorIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size ?? width}
      height={size ?? height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className={clsx(iconStyles, className)}
    >
      <path d="m5 8 6 6" />
      <path d="m4 14 6-6 2-3" />
      <path d="M2 5h12" />
      <path d="M7 2h1" />
      <path d="m22 22-5-10-5 10" />
      <path d="M14 18h6" />
    </svg>
  );
};

export default LanguagesIcon;
