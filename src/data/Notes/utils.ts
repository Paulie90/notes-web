import { parseTags, stringifyTags } from "data/Tags/utils";

import { INote, INoteDTO } from "./types";

export const parseNote: (note: INoteDTO) => INote = (note: INoteDTO) => {
  const tags = parseTags(note.tags);

  return {
    ...note,
    tags,
  };
};

export const stringifyNote: (note: INote) => INoteDTO = (note: INote) => {
  const tags = stringifyTags(note.tags);

  return {
    ...note,
    tags,
  };
};
