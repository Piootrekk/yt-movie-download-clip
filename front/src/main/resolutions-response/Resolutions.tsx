import { use } from "react";
import { getResolutions } from "./videoInfo.api";

type ResolutionsProps = {
  formValues: unknown;
};

const Resolutions = ({ formValues }: ResolutionsProps) => {
  const response = use(getResolutions(formValues));

  return <pre>{JSON.stringify(response, null, 2)}</pre>;
};

export default Resolutions;
