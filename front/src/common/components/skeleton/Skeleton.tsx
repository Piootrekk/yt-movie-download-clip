import skeletonStyles from "./Skeleton.module.css";

type SkeletonProps = {
  className?: string;
};

const Skeleton = ({ className }: SkeletonProps) => {
  return (
    <div className={`${skeletonStyles.skeleton} ${className ?? className}`} />
  );
};

export default Skeleton;
