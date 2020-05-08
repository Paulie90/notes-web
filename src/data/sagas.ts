import { all } from "redux-saga/effects";

import notesSaga from "./Notes/sagas";

export default function* sagas() {
  yield all([notesSaga()]);
}
