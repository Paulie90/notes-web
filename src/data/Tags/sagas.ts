import { AxiosResponse } from "axios";
import { all, put, takeEvery } from "redux-saga/effects";

import { fetchTagsErrorAction, fetchTagsSuccessAction, TAGS_FETCH_START } from "./actions";
import { getTagsList } from "./service";
import { TTag } from "./types";

function* getTagListSaga() {
  try {
    const { data }: AxiosResponse<TTag[]> = yield getTagsList();
    yield put(fetchTagsSuccessAction(data));
  } catch (error) {
    yield put(fetchTagsErrorAction(error));
  }
}

export default function* tagsSaga() {
  yield all([takeEvery(TAGS_FETCH_START, getTagListSaga)]);
}
