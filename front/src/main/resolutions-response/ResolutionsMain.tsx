import { use } from "react";
import { getResolutions } from "./videoInfo.api";
import resolutionsStyle from "./Resolution.module.css";
import TechnicalDetails from "./resolution-details/TechnicalDetails";
import ResolutionList from "./resolution-lists/ResolutionList";

type ResolutionsProps = {
  formValues: unknown;
};

const Resolutions = ({ formValues }: ResolutionsProps) => {
  const formatResponse = use(getResolutions(formValues));

  return (
    <div className={resolutionsStyle.container}>
      <ResolutionList {...formatResponse} />
      <TechnicalDetails />
    </div>
  );
};
export default Resolutions;
