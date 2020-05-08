import { all, put, takeEvery } from "redux-saga/effects";

import {
  addNoteErrorAction,
  addNoteSuccessAction,
  deleteNoteErrorAction,
  deleteNoteSuccessAction,
  editNoteErrorAction,
  editNoteSuccessAction,
  fetchNotesErrorAction,
  fetchNotesSuccessAction,
  fetchNoteSuccessAction,
  IAddNoteStartAction,
  IDeleteNoteStartAction,
  IEditNoteStartAction,
  IFetchNoteStartAction,
  NOTES_FETCH_START,
  NOTE_ADD_START,
  NOTE_DELETE_START,
  NOTE_EDIT_START,
  NOTE_FETCH_START,
} from "./actions";
import { addNote, deleteNote, editNote, getNote, getNoteList } from "./service";

function* fetchNotesSaga() {
  try {
    const { data } = yield getNoteList();
    yield put(fetchNotesSuccessAction(data));
  } catch (error) {
    yield put(fetchNotesErrorAction(error));
  }
}

function* fetchNoteSaga(action: IFetchNoteStartAction) {
  try {
    const { data } = yield getNote(action.noteId);
    yield put(fetchNoteSuccessAction(data));
  } catch (error) {
    yield put(fetchNotesErrorAction(error));
  }
}

function* addNoteSaga(action: IAddNoteStartAction) {
  try {
    const response = yield addNote(action.text); // yield gives any type :(
    yield put(addNoteSuccessAction(response.data));
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
    yield editNote(action.note);
    yield put(editNoteSuccessAction(action.note));
  } catch (error) {
    yield put(editNoteErrorAction(error));
  }
}

export default function* notesSaga() {
  yield all([
    takeEvery(NOTES_FETCH_START, fetchNotesSaga),
    takeEvery(NOTE_FETCH_START, fetchNoteSaga),
    takeEvery(NOTE_ADD_START, addNoteSaga),
    takeEvery(NOTE_DELETE_START, deleteNoteSaga),
    takeEvery(NOTE_EDIT_START, editNoteSaga),
  ]);
}
