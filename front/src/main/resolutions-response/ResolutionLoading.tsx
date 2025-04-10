import Skeleton from "../../common/components/skeleton/Skeleton";
import loadingStyles from "./Resolution.module.css";

const sectionAmount = 3;
const skeletonAmount = 5;

const ResolutionLoading = () => {
  return (
    <div className={loadingStyles.container}>
      {Array.from({ length: sectionAmount }).map((_, sectionIndex) => (
        <div key={sectionIndex} className={loadingStyles.section}>
          {Array.from({ length: skeletonAmount }).map((_, skeletonIndex) => (
            <Skeleton key={skeletonIndex} className={loadingStyles.skeleton} />
          ))}
        </div>
      ))}
    </div>
  );
};
export default ResolutionLoading;
