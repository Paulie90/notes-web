import { parseTags, stringifyTags } from "data/Tags/utils";

import { INote, INoteDTO, TQueryNoteDTO } from "./types";

export const parseNote: (note: INoteDTO) => INote = (note: INoteDTO) => {
  const tags = parseTags(note.tags);

  return {
    ...note,
    tags,
  };
};

export const parseQueryNote: (note: TQueryNoteDTO) => INote = (note: TQueryNoteDTO) => {
  const tags = parseTags(note[3] as string);

  return {
    text: note[0] as string,
    fav: note[1] as boolean,
    id: note[2] as string,
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
