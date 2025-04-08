import { use } from "react";
import {
  fetchFormats,
  filtersValidator,
  TYtInfoApiResponse,
} from "../videoInfo.api";

type ResolutionsProps = {
  formValues: unknown;
};

const useHandleFetch = async (
  formFormats: unknown
): Promise<TYtInfoApiResponse> => {
  const validatedFormValues = filtersValidator(formFormats);
  const response = fetchFormats(validatedFormValues);
  return response;
};

const Resolutions = ({ formValues }: ResolutionsProps) => {
  const response = use(useHandleFetch(formValues));

  return <pre>{JSON.stringify(response, null, 2)}</pre>;
};

export default Resolutions;
