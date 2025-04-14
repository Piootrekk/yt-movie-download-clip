import Skeleton from "../../../common/components/skeleton/Skeleton";
import loadingStyles from "./ResolutionLoading.module.css";

const sectionAmount = 3;
const skeletonAmount = 8;

const ResolutionLoading = () => {
  return (
    <div className={loadingStyles.filterContainer}>
      {Array.from({ length: sectionAmount }).map((_, sectionIndex) => (
        <div key={sectionIndex} className={loadingStyles.filterColumn}>
          <div className={loadingStyles.filterList}>
            {Array.from({ length: skeletonAmount }).map((_, skeletonIndex) => (
              <Skeleton
                key={skeletonIndex}
                className={loadingStyles.skeleton}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
export default ResolutionLoading;
