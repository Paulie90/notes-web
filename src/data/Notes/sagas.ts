import { AxiosResponse } from "axios";
import { all, put, takeEvery } from "redux-saga/effects";

import { fetchTagsStartAction } from "data/Tags/actions";

import {
  addNoteErrorAction,
  addNoteSuccessAction,
  deleteNoteErrorAction,
  deleteNoteSuccessAction,
  editNoteErrorAction,
  editNoteSuccessAction,
  fetchNotesByTagErrorAction,
  fetchNotesByTagSuccessAction,
  fetchNotesErrorAction,
  fetchNotesSuccessAction,
  fetchNoteSuccessAction,
  IAddNoteStartAction,
  IDeleteNoteStartAction,
  IEditNoteStartAction,
  IFetchNotesByTagStartAction,
  IFetchNoteStartAction,
  NOTES_FETCH_BY_TAG_START,
  NOTES_FETCH_START,
  NOTE_ADD_START,
  NOTE_DELETE_START,
  NOTE_EDIT_START,
  NOTE_FETCH_START,
} from "./actions";
import { addNote, deleteNote, editNote, getNote, getNoteByTag, getNoteList } from "./service";
import { INoteDTO } from "./types";
import { parseNote, stringifyNote } from "./utils";

function* fetchNotesSaga() {
  try {
    const { data }: AxiosResponse<INoteDTO[]> = yield getNoteList(); // yield gives any type :(
    const parsedData = data.map((note) => parseNote(note));

    yield put(fetchNotesSuccessAction(parsedData));
  } catch (error) {
    yield put(fetchNotesErrorAction(error));
  }
}

function* fetchNotesByTagSaga(action: IFetchNotesByTagStartAction) {
  try {
    const { data }: AxiosResponse<INoteDTO[]> = yield getNoteByTag(action.tag);
    const parsedData = data.map((note) => parseNote(note));

    yield put(fetchNotesByTagSuccessAction(parsedData));
  } catch (error) {
    yield put(fetchNotesByTagErrorAction(error));
  }
}

function* fetchNoteSaga(action: IFetchNoteStartAction) {
  try {
    const { data }: AxiosResponse<INoteDTO> = yield getNote(action.noteId);
    const parsedData = parseNote(data);

    yield put(fetchNoteSuccessAction(parsedData));
  } catch (error) {
    yield put(fetchNotesErrorAction(error));
  }
}

function* addNoteSaga(action: IAddNoteStartAction) {
  try {
    const response: AxiosResponse<INoteDTO> = yield addNote(action.text);
    const parsedNote = parseNote(response.data);

    yield put(addNoteSuccessAction(parsedNote));
  } catch (error) {
    yield put(addNoteErrorAction(error));
  }
}

function* deleteNoteSaga(action: IDeleteNoteStartAction) {
  try {
    yield deleteNote(action.noteId);
    yield put(deleteNoteSuccessAction(action.noteId));
  } catch (error) {
    yield put(deleteNoteErrorAction(error));
  }
}

function* editNoteSaga(action: IEditNoteStartAction) {
  try {
    const noteDTO = stringifyNote(action.note);

    yield editNote(noteDTO);
    yield put(fetchTagsStartAction());
    yield put(editNoteSuccessAction(action.note));
  } catch (error) {
    yield put(editNoteErrorAction(error));
  }
}

export default function* notesSaga() {
  yield all([
    takeEvery(NOTES_FETCH_START, fetchNotesSaga),
    takeEvery(NOTES_FETCH_BY_TAG_START, fetchNotesByTagSaga),
    takeEvery(NOTE_FETCH_START, fetchNoteSaga),
    takeEvery(NOTE_ADD_START, addNoteSaga),
    takeEvery(NOTE_DELETE_START, deleteNoteSaga),
    takeEvery(NOTE_EDIT_START, editNoteSaga),
  ]);
}
