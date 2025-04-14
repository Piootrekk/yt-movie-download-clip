import { clsx } from "clsx";
import skeletonStyles from "./Skeleton.module.css";

type SkeletonProps = {
  className?: string;
};

const Skeleton = ({ className }: SkeletonProps) => {
  return <div className={clsx(skeletonStyles.skeleton, className)} />;
};

export default Skeleton;
