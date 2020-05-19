import { TTag, TTagsDTO } from "./types";

export const parseTags: (tags?: TTagsDTO) => TTag[] = (tags?: TTagsDTO) => (tags ? tags.split(",") : []);

export const stringifyTags: (tags?: TTag[]) => TTagsDTO = (tags?: TTag[]) => (tags ? tags.join(",") : "");
