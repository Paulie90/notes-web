import { AxiosError } from "axios";
import { Reducer } from "redux";

import {
  NOTES_FETCH_BY_TAG_ERROR,
  NOTES_FETCH_BY_TAG_START,
  NOTES_FETCH_BY_TAG_SUCCESS,
  NOTES_FETCH_ERROR,
  NOTES_FETCH_START,
  NOTES_FETCH_SUCCESS,
  NOTE_ADD_ERROR,
  NOTE_ADD_START,
  NOTE_ADD_SUCCESS,
  NOTE_DELETE_ERROR,
  NOTE_DELETE_START,
  NOTE_DELETE_SUCCESS,
  NOTE_EDIT_ERROR,
  NOTE_EDIT_START,
  NOTE_EDIT_SUCCESS,
  NOTE_FETCH_ERROR,
  NOTE_FETCH_START,
  NOTE_FETCH_SUCCESS,
  TNotesAction,
} from "./actions";
import { INote } from "./types";

export interface INotesState {
  pending: boolean;
  notes: INote[];
  note?: INote;
  error?: AxiosError;
}

const initialState = {
  pending: false,
  notes: [],
};

export const notesReducer: Reducer<INotesState, TNotesAction> = (
  state: INotesState = initialState,
  action: TNotesAction,
) => {
  switch (action.type) {
    case NOTES_FETCH_START:
    case NOTES_FETCH_BY_TAG_START:
    case NOTE_FETCH_START:
    case NOTE_ADD_START:
    case NOTE_DELETE_START:
    case NOTE_EDIT_START:
      return {
        ...state,
        pending: true,
      };
    case NOTES_FETCH_ERROR:
    case NOTES_FETCH_BY_TAG_ERROR:
    case NOTE_FETCH_ERROR:
    case NOTE_ADD_ERROR:
    case NOTE_DELETE_ERROR:
    case NOTE_EDIT_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case NOTES_FETCH_SUCCESS:
    case NOTES_FETCH_BY_TAG_SUCCESS:
      return {
        ...state,
        pending: false,
        notes: action.notes,
      };
    case NOTE_FETCH_SUCCESS:
      return {
        ...state,
        pending: false,
        note: action.note,
      };
    case NOTE_ADD_SUCCESS:
      const addUpdatedNotes = [...state.notes, action.newNote];
      return {
        ...state,
        pending: false,
        notes: addUpdatedNotes,
      };
    case NOTE_DELETE_SUCCESS:
      const deleteUpdatedNotes = state.notes.filter((note) => note.id !== action.noteId);
      return {
        ...state,
        pending: false,
        notes: deleteUpdatedNotes,
      };
    case NOTE_EDIT_SUCCESS:
      const editUpdatedNotes = state.notes.map((note) => (note.id === action.note.id ? action.note : note));
      return {
        ...state,
        pending: false,
        notes: editUpdatedNotes,
        note: action.note,
      };
    default:
      return state;
  }
};
