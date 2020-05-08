import { combineReducers } from "redux";

import { INotesState, notesReducer } from "./Notes";

export interface IAppState {
  notes: INotesState;
}

export default combineReducers<IAppState>({
  notes: notesReducer,
});
