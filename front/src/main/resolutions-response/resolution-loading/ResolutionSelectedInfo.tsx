import Skeleton from "../../../common/components/skeleton/Skeleton";
import skeletonStyles from "./ResolutionLoading.module.css";

const ResolutionSelectedInfo = () => {
  return (
    <div className={skeletonStyles.filterColumn}>
      <Skeleton className={skeletonStyles.skeletonBasicInfo} />
    </div>
  );
};

export default ResolutionSelectedInfo;
