import { AxiosError } from "axios";
import { Action } from "redux";

import { INote } from "./types";

export const NOTES_FETCH_START = "NOTES_FETCH_START";
export const NOTES_FETCH_SUCCESS = "NOTES_FETCH_SUCCESS";
export const NOTES_FETCH_ERROR = "NOTES_FETCH_ERROR";
export const NOTE_FETCH_START = "NOTE_FETCH_START";
export const NOTE_FETCH_SUCCESS = "NOTE_FETCH_SUCCESS";
export const NOTE_FETCH_ERROR = "NOTE_FETCH_ERROR";
export const NOTE_ADD_START = "NOTE_ADD_START";
export const NOTE_ADD_SUCCESS = "NOTE_ADD_SUCCESS";
export const NOTE_ADD_ERROR = "NOTE_ADD_ERROR";
export const NOTE_DELETE_START = "NOTE_DELETE_START";
export const NOTE_DELETE_SUCCESS = "NOTE_DELETE_SUCCESS";
export const NOTE_DELETE_ERROR = "NOTE_DELETE_ERROR";
export const NOTE_EDIT_START = "NOTE_EDIT_START";
export const NOTE_EDIT_SUCCESS = "NOTE_EDIT_SUCCESS";
export const NOTE_EDIT_ERROR = "NOTE_EDIT_ERROR";

// -- FETCH LIST --
export interface IFetchNotesStartAction extends Action<typeof NOTES_FETCH_START> {}
export const fetchNotesStartAction = (): IFetchNotesStartAction => ({
  type: NOTES_FETCH_START,
});

export interface IFetchNotesSuccessAction extends Action<typeof NOTES_FETCH_SUCCESS> {
  notes: INote[];
}
export const fetchNotesSuccessAction = (notes: INote[]): IFetchNotesSuccessAction => ({
  type: NOTES_FETCH_SUCCESS,
  notes,
});

export interface IFetchNotesErrorAction extends Action<typeof NOTES_FETCH_ERROR> {
  error: AxiosError;
}
export const fetchNotesErrorAction = (error: AxiosError): IFetchNotesErrorAction => ({
  type: NOTES_FETCH_ERROR,
  error,
});

// -- FETCH NOTE --
export interface IFetchNoteStartAction extends Action<typeof NOTE_FETCH_START> {
  noteId: string;
}
export const fetchNoteStartAction = (noteId: string): IFetchNoteStartAction => ({
  type: NOTE_FETCH_START,
  noteId,
});

export interface IFetchNoteSuccessAction extends Action<typeof NOTE_FETCH_SUCCESS> {
  note: INote;
}
export const fetchNoteSuccessAction = (note: INote): IFetchNoteSuccessAction => ({
  type: NOTE_FETCH_SUCCESS,
  note,
});

export interface IFetchNoteErrorAction extends Action<typeof NOTE_FETCH_ERROR> {
  error: AxiosError;
}
export const fetchNoteErrorAction = (error: AxiosError): IFetchNoteErrorAction => ({
  type: NOTE_FETCH_ERROR,
  error,
});

// -- ADD --
export interface IAddNoteStartAction extends Action<typeof NOTE_ADD_START> {
  text: string;
}
export const addNoteStartAction = (text: string): IAddNoteStartAction => ({
  type: NOTE_ADD_START,
  text,
});

export interface IAddNoteSuccessAction extends Action<typeof NOTE_ADD_SUCCESS> {
  newNote: INote;
}
export const addNoteSuccessAction = (newNote: INote): IAddNoteSuccessAction => ({
  type: NOTE_ADD_SUCCESS,
  newNote,
});

export interface IAddNoteErrorAction extends Action<typeof NOTE_ADD_ERROR> {
  error: AxiosError;
}
export const addNoteErrorAction = (error: AxiosError): IAddNoteErrorAction => ({
  type: NOTE_ADD_ERROR,
  error,
});

// -- DELETE --
export interface IDeleteNoteStartAction extends Action<typeof NOTE_DELETE_START> {
  noteId: string;
}
export const deleteNoteStartAction = (noteId: string): IDeleteNoteStartAction => ({
  type: NOTE_DELETE_START,
  noteId,
});

export interface IDeleteNoteSuccessAction extends Action<typeof NOTE_DELETE_SUCCESS> {
  noteId: string;
}
export const deleteNoteSuccessAction = (noteId: string): IDeleteNoteSuccessAction => ({
  type: NOTE_DELETE_SUCCESS,
  noteId,
});

export interface IDeleteNoteErrorAction extends Action<typeof NOTE_DELETE_ERROR> {
  error: AxiosError;
}
export const deleteNoteErrorAction = (error: AxiosError): IDeleteNoteErrorAction => ({
  type: NOTE_DELETE_ERROR,
  error,
});

// -- EDIT --
export interface IEditNoteStartAction extends Action<typeof NOTE_EDIT_START> {
  note: INote;
}
export const editNoteStartAction = (note: INote): IEditNoteStartAction => ({
  type: NOTE_EDIT_START,
  note,
});

export interface IEditNoteSuccessAction extends Action<typeof NOTE_EDIT_SUCCESS> {
  note: INote;
}
export const editNoteSuccessAction = (note: INote): IEditNoteSuccessAction => ({
  type: NOTE_EDIT_SUCCESS,
  note,
});

export interface IEditNoteErrorAction extends Action<typeof NOTE_EDIT_ERROR> {
  error: AxiosError;
}
export const editNoteErrorAction = (error: AxiosError): IEditNoteErrorAction => ({
  type: NOTE_EDIT_ERROR,
  error,
});

export type TNotesAction =
  | IFetchNotesStartAction
  | IFetchNotesSuccessAction
  | IFetchNotesErrorAction
  | IFetchNoteStartAction
  | IFetchNoteSuccessAction
  | IFetchNoteErrorAction
  | IAddNoteStartAction
  | IAddNoteSuccessAction
  | IAddNoteErrorAction
  | IDeleteNoteStartAction
  | IDeleteNoteSuccessAction
  | IDeleteNoteErrorAction
  | IEditNoteStartAction
  | IEditNoteSuccessAction
  | IEditNoteErrorAction;
