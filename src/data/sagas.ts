import { all } from "redux-saga/effects";

import notesSaga from "./Notes/sagas";
import tagsSaga from "./Tags/sagas";

export default function* sagas() {
  yield all([notesSaga(), tagsSaga()]);
}
