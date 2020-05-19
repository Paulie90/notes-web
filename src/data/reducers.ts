import { combineReducers } from "redux";

import { INotesState, notesReducer } from "./Notes";
import { ITagsState, tagsReducer } from "./Tags/reducers";

export interface IAppState {
  notes: INotesState;
  tags: ITagsState;
}

export default combineReducers<IAppState>({
  notes: notesReducer,
  tags: tagsReducer,
});
