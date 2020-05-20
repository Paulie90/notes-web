import { all, debounce, put, takeEvery } from "redux-saga/effects";

import { fetchTagsStartAction } from "data/Tags/actions";

import {
  addNoteErrorAction,
  addNoteSuccessAction,
  deleteNoteErrorAction,
  deleteNoteSuccessAction,
  editNoteErrorAction,
  editNoteSuccessAction,
  fetchNotesByFavoriteErrorAction,
  fetchNotesByFavoriteSuccessAction,
  fetchNotesByQueryErrorAction,
  fetchNotesByQueryStartAction,
  fetchNotesByQuerySuccessAction,
  fetchNotesByTagErrorAction,
  fetchNotesByTagSuccessAction,
  fetchNotesErrorAction,
  fetchNotesSuccessAction,
  fetchNoteSuccessAction,
  IAddNoteStartAction,
  IDeleteNoteStartAction,
  IEditNoteStartAction,
  IFetchNotesByQueryInitAction,
  IFetchNotesByQueryStartAction,
  IFetchNotesByTagStartAction,
  IFetchNoteStartAction,
  NOTES_FETCH_BY_FAVORITE_START,
  NOTES_FETCH_BY_QUERY_INIT,
  NOTES_FETCH_BY_QUERY_START,
  NOTES_FETCH_BY_TAG_START,
  NOTES_FETCH_START,
  NOTE_ADD_START,
  NOTE_DELETE_START,
  NOTE_EDIT_START,
  NOTE_FETCH_START,
} from "./actions";
import {
  addNote,
  deleteNote,
  editNote,
  getNote,
  getNoteList,
  getNotesByFavorite,
  getNotesByQuery,
  getNotesByTag,
} from "./service";
import { INote } from "./types";

function* fetchNotesSaga() {
  try {
    const data: INote[] = yield getNoteList(); // yield gives any type :(

    yield put(fetchNotesSuccessAction(data));
  } catch (error) {
    yield put(fetchNotesErrorAction(error));
  }
}

function* fetchNotesByTagSaga(action: IFetchNotesByTagStartAction) {
  try {
    const data: INote[] = yield getNotesByTag(action.tag);

    yield put(fetchNotesByTagSuccessAction(data));
  } catch (error) {
    yield put(fetchNotesByTagErrorAction(error));
  }
}

function* fetchNotesByFavoriteSaga() {
  try {
    const data: INote[] = yield getNotesByFavorite();

    yield put(fetchNotesByFavoriteSuccessAction(data));
  } catch (error) {
    yield put(fetchNotesByFavoriteErrorAction(error));
  }
}

function* initFetchNotesByQuerySaga(action: IFetchNotesByQueryInitAction) {
  yield put(fetchNotesByQueryStartAction(action.query));
}

function* fetchNotesByQuerySaga(action: IFetchNotesByQueryStartAction) {
  try {
    const data: INote[] = yield getNotesByQuery(action.query);

    yield put(fetchNotesByQuerySuccessAction(data));
  } catch (error) {
    yield put(fetchNotesByQueryErrorAction(error));
  }
}

function* fetchNoteSaga(action: IFetchNoteStartAction) {
  try {
    const data: INote = yield getNote(action.noteId);

    yield put(fetchNoteSuccessAction(data));
  } catch (error) {
    yield put(fetchNotesErrorAction(error));
  }
}

function* addNoteSaga(action: IAddNoteStartAction) {
  try {
    const data: INote = yield addNote(action.text);

    yield put(addNoteSuccessAction(data));
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
    takeEvery(NOTES_FETCH_BY_FAVORITE_START, fetchNotesByFavoriteSaga),
    debounce(400, NOTES_FETCH_BY_QUERY_INIT, initFetchNotesByQuerySaga),
    takeEvery(NOTES_FETCH_BY_QUERY_START, fetchNotesByQuerySaga),
    takeEvery(NOTE_FETCH_START, fetchNoteSaga),
    takeEvery(NOTE_ADD_START, addNoteSaga),
    takeEvery(NOTE_DELETE_START, deleteNoteSaga),
    takeEvery(NOTE_EDIT_START, editNoteSaga),
  ]);
}
