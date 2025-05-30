type IconProps =
  | {
      size: number;
      width?: never;
      height?: never;
      className?: string;
    }
  | {
      width: number;
      height: number;
      size?: never;
      className?: string;
    };

export type { IconProps };
