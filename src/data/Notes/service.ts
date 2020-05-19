import { HTTPFetcher } from "core/api/http";

import { TTag } from "data/Tags";

import { INote, INoteDTO } from "./types";

const API = {
  LIST: "/notes",
  NOTE: (noteId: string) => `/notes/${noteId}`,
  TAG: (tag: TTag) => `/notes/tags/${tag}`,
  ADD: "/notes",
  DELETE: (noteId: string) => `/notes/${noteId}`,
  EDIT: (noteId: string) => `/notes/${noteId}`,
};

export const getNoteList = async () => HTTPFetcher.get<INote[]>(API.LIST);

export const getNote = async (noteId: string) => HTTPFetcher.get<INoteDTO>(API.NOTE(noteId));

export const getNoteByTag = async (tag: TTag) => HTTPFetcher.get<INoteDTO>(API.TAG(tag));

export const addNote = async (text: string, fav: boolean = false) =>
  HTTPFetcher.post<INoteDTO>(API.ADD, {
    text,
    fav,
  });

export const deleteNote = async (noteId: string) => HTTPFetcher.delete(API.DELETE(noteId));

export const editNote = async (note: INoteDTO) => HTTPFetcher.put<INoteDTO>(API.EDIT(note.id), note);
