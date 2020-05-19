import { HTTPFetcher } from "core/api/http";

import { TTag } from "data/Tags";

import { INote, INoteDTO } from "./types";
import { parseNote, stringifyNote } from "./utils";

const API = {
  LIST: "/notes",
  NOTE: (noteId: string) => `/notes/${noteId}`,
  TAG: (tag: TTag) => `/notes/tags/${tag}`,
  ADD: "/notes",
  DELETE: (noteId: string) => `/notes/${noteId}`,
  EDIT: (noteId: string) => `/notes/${noteId}`,
};

export const getNoteList = async () =>
  HTTPFetcher.get<INoteDTO[]>(API.LIST).then((payload) => payload.data.map((note) => parseNote(note)));

export const getNote = async (noteId: string) =>
  HTTPFetcher.get<INoteDTO>(API.NOTE(noteId)).then((payload) => parseNote(payload.data));

export const getNotesByTag = async (tag: TTag) =>
  HTTPFetcher.get<INoteDTO[]>(API.TAG(tag)).then((payload) => payload.data.map((note) => parseNote(note)));

export const addNote = async (text: string, fav: boolean = false) =>
  HTTPFetcher.post<INoteDTO>(API.ADD, {
    text,
    fav,
  }).then((payload) => parseNote(payload.data));

export const deleteNote = async (noteId: string) => HTTPFetcher.delete(API.DELETE(noteId));

export const editNote = async (note: INote) => {
  const noteDTO = stringifyNote(note);

  HTTPFetcher.put(API.EDIT(note.id), noteDTO);
};
