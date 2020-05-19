import { HTTPFetcher } from "core/api/http";

import { TTagsDTO } from "./types";

const API = {
  LIST: "/tags",
};

export const getTagsList = async () => HTTPFetcher.get<TTagsDTO>(API.LIST);
