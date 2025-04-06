import { use } from "react";
import { getBackendUrl } from "../../common/utils/env";
import { TYtInfoApiResponse } from "../videoInfo.api";
import { TFormDataFormats } from "../Formats.type";
import {
  fetchDataAsync,
  getCachedPromise,
} from "../../common/utils/fetchCache";

type ResolutionsProps = {
  formFormats: TFormDataFormats;
};

const handleEndpoint = (formFormats: TFormDataFormats) => {
  const backendUrl = getBackendUrl();
  const queryParams = new URLSearchParams(formFormats).toString();
  const endpoint = `${backendUrl}/yt/formats?${queryParams}`;
  return getCachedPromise(endpoint, () =>
    fetchDataAsync<TYtInfoApiResponse>(endpoint)
  );
};

const Resolutions = ({ formFormats }: ResolutionsProps) => {
  const response = use(handleEndpoint(formFormats));

  return <pre>{JSON.stringify(response, null, 2)}</pre>;
};

export default Resolutions;
