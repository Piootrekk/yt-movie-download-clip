import { type } from "arktype";
import { paths } from "../common/api/api.types";

type TYtInfoApiQuery = paths["/yt/formats"]["get"]["parameters"]["query"];
type TYtInfoApiResponse =
  paths["/yt/formats"]["get"]["responses"]["200"]["content"]["application/json"];

const linkSchema = type({
  url: {
    type: "string.url",
  },
});

export type { TYtInfoApiQuery, TYtInfoApiResponse, linkSchema };
