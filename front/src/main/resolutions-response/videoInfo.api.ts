import { type } from "arktype";
import { components, paths } from "../../common/api/api.types";
import { getBackendUrl } from "../../common/utils/env";
import {
  fetchDataAsync,
  getCachedPromise,
} from "../../common/utils/fetchCache";

type TYtInfoApiQuery = paths["/yt/formats"]["get"]["parameters"]["query"];
type TYtInfoApiResponse =
  paths["/yt/formats"]["get"]["responses"]["200"]["content"]["application/json"];

type TAudioResolution = components["schemas"]["BaseFilterContainerDto"];
type TVideoResolution = components["schemas"]["FiltersVideoDto"];
type TBothResolution = components["schemas"]["BaseFilterContainerDto"];

const filtersSchema = type({
  url: "string.url",
  client: "Array?",
});

const filtersValidator = (inputValues: unknown): TYtInfoApiQuery => {
  const output = filtersSchema(inputValues);
  if (output instanceof type.errors) {
    throw new Error(output.summary);
  }
  return output;
};

const fetchFormats = (
  formFormats: TYtInfoApiQuery
): Promise<TYtInfoApiResponse> => {
  const backendUrl = getBackendUrl();
  const queryParams = new URLSearchParams({
    url: formFormats.url,
  });

  if (formFormats.clients !== undefined) {
    formFormats.clients?.forEach((client) => {
      queryParams.append("client", client);
    });
  }
  const endpoint = `${backendUrl}/yt/formats?${queryParams}`;
  return getCachedPromise(endpoint, () =>
    fetchDataAsync<TYtInfoApiResponse>(endpoint)
  );
};

const getResolutions = (formFormats: unknown): Promise<TYtInfoApiResponse> => {
  const validatedFormValues = filtersValidator(formFormats);
  const response = fetchFormats(validatedFormValues);
  return response;
};

export type { TAudioResolution, TVideoResolution, TBothResolution };
export { getResolutions };
