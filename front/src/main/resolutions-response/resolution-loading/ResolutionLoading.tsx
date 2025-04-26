import loadingStyles from "./ResolutionLoading.module.css";

import Skeleton from "../../../common/components/skeleton/Skeleton";

const sectionAmount = 3;
const skeletonAmount = 8;

const ResolutionLoadingFormats = () => {
  return (
    <>
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
    </>
  );
};

const ResolutionLoadingSelectedInfo = () => {
  return (
    <div className={loadingStyles.filterColumn}>
      <Skeleton className={loadingStyles.skeletonSelectedInfo} />
    </div>
  );
};

const ResolutionLoadingBasicInfo = () => {
  return (
    <div className={loadingStyles.filterColumn}>
      <Skeleton className={loadingStyles.skeletonBasicInfo} />
    </div>
  );
};

const ResolutionLoading = () => {
  return (
    <div className={loadingStyles.container}>
      <ResolutionLoadingBasicInfo />
      <ResolutionLoadingSelectedInfo />
      <div className={loadingStyles.filterContainer}>
        <ResolutionLoadingFormats />
      </div>
    </div>
  );
};
export default ResolutionLoading;
