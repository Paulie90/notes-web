import { HTTPFetcher } from "core/api/http";

import { INote } from "./types";

const API = {
  LIST: "/notes",
  NOTE: (noteId: string) => `/notes/${noteId}`,
  ADD: "/notes",
  DELETE: (noteId: string) => `/notes/${noteId}`,
  EDIT: (noteId: string) => `/notes/${noteId}`,
};

export const getNoteList = async () => HTTPFetcher.get<INote[]>(API.LIST);

export const getNote = async (noteId: string) => HTTPFetcher.get<INote[]>(API.NOTE(noteId));

export const addNote = async (text: string, fav: boolean = false) =>
  HTTPFetcher.post<INote>(API.ADD, {
    text,
    fav,
  });

export const deleteNote = async (noteId: string) => HTTPFetcher.delete<INote>(API.DELETE(noteId));

export const editNote = async (note: INote) => HTTPFetcher.put<INote>(API.EDIT(note.id), note);
