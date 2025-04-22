import loadingStyles from "./ResolutionLoading.module.css";
import ResolutionLoadingFormats from "./ResolutionLoadingFormats";
import ResolutionSelectedInfo from "./ResolutionSelectedInfo";

const ResolutionLoading = () => {
  return (
    <div className={loadingStyles.container}>
      <ResolutionSelectedInfo />
      <div className={loadingStyles.filterContainer}>
        <ResolutionLoadingFormats />
      </div>
    </div>
  );
};
export default ResolutionLoading;
